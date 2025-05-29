import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from './entities/order.entity';
import { UserService } from 'src/user/user.service';
import { CartService } from 'src/cart/cart.service';
import { User } from 'src/user/entities/user.entity';
import { Cart, CartItem } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { Token } from 'src/token/entities/token.entity';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { EmailService } from 'src/email/email.service';
import { QueueService } from 'src/common/queue/queue.service';
import { TokenService } from 'src/token/token.service';

@Module({
  imports : [TypeOrmModule.forFeature([Order, OrderItem, User, Cart, CartItem, Product, Token, Address])],
  controllers: [OrderController],
  providers: [OrderService, UserService, CartService, AddressService, EmailService, QueueService, TokenService],
})
export class OrderModule {}
