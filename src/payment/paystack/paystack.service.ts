
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../payment.service';
import { OrderService } from 'src/order/order.service';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Order, OrderStatus, PayStatus } from 'src/order/entities/order.entity';
import { UserService } from 'src/user/user.service';
import { CreatePaymentDto, CreateTransactionResponseDto, PaystackWebApi, verifyPaymentDto } from './dto/paystack.dto';

@Injectable()
export class PaystackService {
  private readonly paystackSecretKey: string;
  private readonly paystackApiUrl: string;

  constructor(
    private paymentService: PaymentService,
    private configService: ConfigService,
    private orderService: OrderService,
    private userService: UserService
  ) {
    this.paystackSecretKey = this.configService.get('paystack.secretKey');
    this.paystackApiUrl = this.configService.get('paystack.apiUrl');
  }

  private async fetchPaystackApi(dto: PaystackWebApi) {
    const { endpoint, method, secretKey, body } = dto;
    
    const url = `${this.paystackApiUrl}/${endpoint}`;

    const headers = {
      Authorization: `Bearer ${secretKey}`,
    };

    try {
      const response = await axios({
        method,
        url,
        headers,
        data: body,
      });
      if (response) {
        return response.data;
      }
      return null
    } catch (err) {
      console.log(err, 'err');
    }

  }

  async initializePayment(userId: string, dto: CreatePaymentDto) {

    let result : CreateTransactionResponseDto;
    
    const user = await this.userService.getUserById(userId);
    if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const order = await this.orderService.getOrderById(dto.orderId);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    if (order.user.id !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const total = Math.round(order.totalAmount * 100);
    const paystackApi: PaystackWebApi = {
      endpoint: 'transaction/initialize',
      method: 'POST',
      secretKey: this.paystackSecretKey,
      body: { email: order.user.email, amount: total, metadata: { order_id: order.id } },
    };

    result = await this.fetchPaystackApi(paystackApi);
    if (result.status === true) {
      const payment = await this.paymentService.savePayment({
        reference: result.data.reference,
        accessCode: result.data.access_code,
        authorizationUrl: result.data.authorization_url,
        amount: order.totalAmount,
        status: PaymentStatus.PENDING,
        order: order,
        user: user,
      });

      return result;
    }

    throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
  }
  
  async verifyPayment(dto: verifyPaymentDto ) {

    let payment: any;
    const paystackApi: PaystackWebApi = {
      endpoint: `transaction/verify/${dto.reference}`,
      method: 'GET',
      secretKey: this.paystackSecretKey
    };

    const response = await this.fetchPaystackApi(paystackApi);
    payment = response.data.status

    const validStatus = ['success', 'failed', 'pending', 'abandoned', 'reversed'];
    if (validStatus.includes(payment)) {
      await this.paymentService.handleVerifyPayment(response.data);
    } else {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
    }

    return payment;
    
  } 

  async handleWebhook(body: any, signature: string) {
    const hash = crypto
      .createHmac('sha512', this.paystackSecretKey)
      .update(JSON.stringify(body))
      .digest('hex'); 

    if (hash !== signature) {
      throw new HttpException('Invalid signature', HttpStatus.BAD_REQUEST);
    }
    switch (body.event) {
      case 'charge.success':
        await this.paymentService.handlePaymentSuccess(body.data);
        break;
      case 'charge.failed':
        await this.paymentService.handlePaymentIssues(body.data);
        break;
      default:
        throw new HttpException('Invalid event', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'success'
    }
  }  

}
