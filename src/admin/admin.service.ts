import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
import { CartService } from 'src/cart/cart.service';
import { Order, OrderStatus } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

  constructor (
    private userService: UserService,
  ) {}
    
}
