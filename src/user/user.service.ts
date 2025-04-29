import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
  ) {}

  async createUser(dto: CreateUserDto) {

    try {
      const userExist = await this.userRepository.findOne({ where: { email: dto.email } });
      if (userExist) {
        throw new ConflictException('User already exist');
      }
      const hashedPassword = AppUtilities.hashPassword(dto.password);

      const user = await this.userRepository.create({
        ...dto,
        password: hashedPassword
      });
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong');
    }

  }

  getAllUsers() {
    return this.userRepository.find();
  }

  public async getUesrbyId(id: string) {
    const user = await this.userRepository.findOne({ where: { id : id } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  deleteUserbyId(id: string) {
    const user = this.userRepository.delete({ id : id});
    return {
      message: 'User deleted successfully',
    }
  }
}
