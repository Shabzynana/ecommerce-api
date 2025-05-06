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

    const user = await this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  getAllUsers() {
    return this.userRepository.find();
  }
 

  public async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id : id } });
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email : email } });
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
