import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { OrderService } from 'src/order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from 'src/order/entities/order.entity';
import { UserService } from 'src/user/user.service';
import { CartService } from 'src/cart/cart.service';
import { AddressService } from 'src/address/address.service';
import { User } from 'src/user/entities/user.entity';
import { Cart, CartItem } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { Address } from 'src/address/entities/address.entity';
import { Token } from 'src/token/entities/token.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Cart, CartItem, Product, Address, Token, Category])],
  controllers: [AdminController],
  providers: [AdminService, OrderService, UserService, CartService, AddressService, CategoryService],
})
export class AdminModule {}
