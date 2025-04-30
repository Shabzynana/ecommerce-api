import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UserService
    ) {}

    async register(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (user) {
            throw new Error('User already exists');
        }
        const hashedPassword =  await AppUtilities.hashPassword(dto.password)
        const newUser = this.userService.createUser({...dto, password: hashedPassword});
        return newUser;
    }

}
