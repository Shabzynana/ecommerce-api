import { Injectable, NotFoundException, ForbiddenException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
import { EmailService } from 'src/email/email.service';
import { TokenType } from 'src/token/dto/token_type';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { resendConfirmationMailDto, UserLoginDto } from './dto/auth.dto';


@Injectable()
export class AuthService {
    private jwtExpires: number;
    private jwtSecret: string;
    private refreshTokenExpires: number;
    private refreshTokenSecret: string;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private tokenService: TokenService,
        private emailService: EmailService
    ) {
        this.jwtExpires = this.configService.get('jwt.expiresIn');
        this.jwtSecret = this.configService.get('jwt.secret');
        this.refreshTokenExpires = this.configService.get('jwt.refreshExpiresIn');
        this.refreshTokenSecret = this.configService.get('jwt.refreshSecret');
    }

    async signToken(userId: string, uuid?: string) {
        console.log(
            userId,
            uuid
        )
        const payload = { sub: userId };
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: this.jwtExpires,
                secret: this.jwtSecret
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: this.refreshTokenExpires,
                secret: this.refreshTokenSecret
            })
        ])

        if (access_token && refresh_token) {
            await this.tokenService.generateLoginToken({
              access_token,
              refresh_token,
              uuid,
              userId,
            });
          }

        return { access_token, refresh_token };     
    }

    async register(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (user) {
            throw new NotFoundException('User already exists');
        }
        const hashedPassword =  await AppUtilities.hashPassword(dto.password)
        const newUser = await this.userService.createUser({...dto, password: hashedPassword});
        await this.emailService.sendConfirmationEmail(newUser);
        return newUser;
    }

    async login(dto: UserLoginDto) {
        const userExist = await this.userService.getUserByEmail(dto.email);
        if (!userExist) {
            throw new NotFoundException('User does not exist');
        }

        const isPasswordCorrect = await AppUtilities.comparePassword(dto.password, userExist.password);
        if (!isPasswordCorrect) {
            throw new UnauthorizedException('Incorrect password');
        }
        return await this.signToken(userExist.id);
    }

    async resendMail(dto: resendConfirmationMailDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
        if (user.is_verified) {
            throw new BadRequestException('User is already verified');
        }
        await this.emailService.sendConfirmationEmail(user);

        return {message: 'Email sent successfully'}
    }

    async confirmEmail(token: string) {
        const tokenData = await this.tokenService.verifyToken(token, TokenType.VERIFY_EMAIL);
        if (!tokenData) {
            throw new UnauthorizedException('Invalid token');
        }

        const user = await this.userService.getUserById(tokenData.userId);
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
        if (user.is_verified) {
            throw new BadRequestException('User is already verified');
        }
        user.is_verified = true;
        user.is_verified_date = new Date();
        await this.userRepository.save(user);
        await this.emailService.welcomeEmail(user);
        return {message: 'Email verified successfully'}
    }

    async forgotPassword(dto: resendConfirmationMailDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
        await this.emailService.sendForgotPasswordEmail(user);
        return {message: 'Email sent successfully'}
    }


}
