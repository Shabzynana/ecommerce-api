import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from 'src/order/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';
import { CartService } from 'src/cart/cart.service';
import { AddressService } from 'src/address/address.service';
import { User } from 'src/user/entities/user.entity';
import { Cart, CartItem } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { Address } from 'src/address/entities/address.entity';
import { PaystackController } from './paystack/paystack.controller';
import { PaystackService } from './paystack/paystack.service';
import { Token } from 'src/token/entities/token.entity';
import { EmailService } from 'src/email/email.service';
import { QueueService } from 'src/common/queue/queue.service';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment, OrderItem, User, Cart, CartItem, Product, Address, Token])],
  controllers: [PaymentController, PaystackController],
  providers: [PaymentService, OrderService, UserService, CartService, AddressService, PaystackService, EmailService, QueueService, TokenService],
})
export class PaymentModule {}
