import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { AppUtilities } from 'src/app.utilities';
import { CartService } from 'src/cart/cart.service';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto, updateOrderStatusDto } from './dto/order.dto';
import { Order, OrderItem, OrderStatus, PayStatus } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor (
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private userService: UserService,
    private cartService: CartService,
    private addressService: AddressService,
    private emailService: EmailService
    
  ) {}

  async generateTrackingNumber() {
    const prefix = "RTX";
    const chars = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const length = 6;
    const today = AppUtilities.dateOnly()
    
    let randomNumber: string;
    let exists = true;
    
    do {

      let randomPart = '';
      for (let i = 0; i < length; i++) {
        randomPart += chars[Math.floor(Math.random() * chars.length)];
      }
      
      randomNumber = `${prefix}-${today}${randomPart}`;
      const existing = await this.orderRepository.findOne({ where: { trackingNumber: randomNumber } });
      exists = !!existing;      
    } while (exists);

    return randomNumber;
  }

  async createOrder(dto: CreateOrderDto) {
    
    let userAddress = null;
    const user = await this.userService.getUserById(dto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cart = await this.cartService.getUserCart(user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    if (cart.cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    if (dto.addressId) {
      userAddress = await this.addressService.getAddressById(dto.addressId);
      if (!userAddress) {
        throw new NotFoundException('Address not found');
      }
      if (userAddress.user.id !== user.id) {
        throw new ForbiddenException('You are not authorized to use this address');
      }
    }

    const order = await this.orderRepository.create({
      user : { id : user.id },
      totalAmount: AppUtilities.totalPrice(cart.cartItems),
      orderStatus: OrderStatus.PENDING,
      trackingNumber: await this.generateTrackingNumber(),
      shippingAddress: userAddress      
    });
    await this.orderRepository.save(order);

    const orderItem = cart.cartItems.map(item => {
      return this.orderItemRepository.create({
        order: order,
        product: item.product,
        quantity: item.quantity,
        price: parseFloat((item.product.price * item.quantity).toFixed(2)),
      })
    })
    await this.orderItemRepository.save(orderItem);

    await this.cartService.emptyCart(cart.id);
    await this.emailService.sendUserOrderEmail(user, order, orderItem);
    return this.getOrderById(order.id);
  };

  async getMyOrders(userId: string) {

    const userOrders = await this.orderRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
      relations: ['orderItems', 'orderItems.product', 'shippingAddress', 'payments', 'user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        }
      }
    });
    return userOrders;
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product', 'shippingAddress', 'payments', 'user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        }
      }
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async cancelOrder(id: string, userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const order = await this.getOrderById(id);
    if (order.user.id !== user.id) {
      throw new ForbiddenException('You are not authorized to cancel this order');
    }
    order.orderStatus = OrderStatus.CANCELLED;
    return this.orderRepository.save(order);
  }

  async updateOrderStatus(id: string, dto: updateOrderStatusDto) {
    const order = await this.getOrderById(id);
    order.orderStatus = dto.status as OrderStatus;
    return this.orderRepository.save(order);
  }

  async updateOrderPayStatus(id: string, dto: updateOrderStatusDto) {
    const order = await this.getOrderById(id);
    order.payStatus = dto.status as PayStatus;
    return this.orderRepository.save(order);
  }

  async getAllOrders() {
    return this.orderRepository.find({
      relations: ['orderItems', 'orderItems.product', 'shippingAddress', 'payments', 'user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        }
      }
    });
  }

  
}
