import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus, PayStatus } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Repository } from 'typeorm';
import { Payment, PaymentMethod, PaymentStatus } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  constructor (
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private orderService: OrderService
  ) {}
  async savePayment(data: Partial<Payment>) {

    const existingPayment = await this.paymentRepository.findOne({ 
      where: { reference: data.reference },
      relations: ['order']
    })
    if (existingPayment) {
      if (existingPayment.status !== data.status) {
        const updated = this.paymentRepository.merge(existingPayment, data);
        console.log('data already exist', 'updated')
        return this.paymentRepository.save(updated); 
      }
  
      console.log('data already exist', 'success')
      return existingPayment;
    }
  
    const newPayment = this.paymentRepository.create(data);
    console.log('newPayment', 'data created')
    return this.paymentRepository.save(newPayment);
  } 

  async handleCardSuccess(data: any) {
    const payment = await this.savePayment({
      reference: data.reference,
      transactionId: data.id,
      authorizationCode : data.authorization.authorization_code,
      amount: Math.round(data.amount / 100),
      status: data.status as PaymentStatus,
      method : data.channel as PaymentMethod
    });
    await this.orderService.updateOrderStatus(payment.order.id, {status: OrderStatus.PROCESSING});
    await this.orderService.updateOrderPayStatus(payment.order.id, {status: PayStatus.PAID}); 
  }

  async handleCardFailed(data: any) {
    const payment = await this.savePayment({
      reference: data.reference,
      transactionId: data.id,
      authorizationCode : data.authorization.authorization_code,
      amount: Math.round(data.amount / 100),
      status: data.status as PaymentStatus,
      method : data.channel as PaymentMethod
    });
  }
}
