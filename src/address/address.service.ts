import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

  constructor (
    @InjectRepository(Address) 
    private addressRepository: Repository<Address>,
    private userService: UserService
  ) {}
  async createAddress(userId: string,dto: CreateAddressDto) {

    const userExists = await this.userService.getUserById(userId);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const address = this.addressRepository.create(dto);
    address.user = userExists
    return this.addressRepository.save(address);
    
  }

  async getCurrentUserAddresses(userId: string) {

    const userExists = await this.userService.getUserById(userId);
    if (!userExists) {
      throw new NotFoundException('User not found');
    } 
    return this.addressRepository.find({ where: { user: userExists }});
  }

  async getAddressById(id: string) {

    const address = await this.addressRepository.findOne({
      where: {id: id},
      relations: ['user'],
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async updateAddress(userId: string, addressId: string, dto: UpdateAddressDto) {

    const userExists = await this.userService.getUserById(userId);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const address = await this.getAddressById(addressId);
    if (address.user.id !== userExists.id) {
      throw new ForbiddenException('You are not authorized to update this address');
    }

    const addressUpdated = Object.assign(address, dto);
    return this.addressRepository.save(addressUpdated);
    
  }

  async deleteAddress(userId: string, addressId: string) {

    const address = await this.getAddressById(addressId);
    const userExists = await this.userService.getUserById(userId);

    if (address.user.id !== userExists.id) {
      throw new ForbiddenException('You are not authorized to delete this address');
    }
  
    return this.addressRepository.remove(address);
  }  
}
