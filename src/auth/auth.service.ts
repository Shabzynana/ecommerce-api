import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/auth.dto';


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
        private tokenService: TokenService
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
            throw new Error('User already exists');
        }
        const hashedPassword =  await AppUtilities.hashPassword(dto.password)
        const newUser = this.userService.createUser({...dto, password: hashedPassword});
        return newUser;
    }

    async login(dto: UserLoginDto) {
        const userExist = await this.userService.getUserByEmail(dto.email);
        if (!userExist) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await AppUtilities.comparePassword(dto.password, userExist.password);
        if (!isPasswordCorrect) {
            throw new Error('Incorrect password');
        }
        return await this.signToken(userExist.id);
    }


}
