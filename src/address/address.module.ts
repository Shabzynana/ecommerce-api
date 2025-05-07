import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Token } from 'src/token/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User, Token])],
  controllers: [AddressController],
  providers: [AddressService, UserService],
})
export class AddressModule {}
