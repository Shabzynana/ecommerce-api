import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  constructor (
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private orderService: OrderService
  ) {}
  async savePayment(data: Partial<Payment>) {

    const userPayment = await this.paymentRepository.findOne({ 
      where: { reference: data.reference } 
    })
    if (userPayment) {
      return userPayment
    } else {
      const payment = this.paymentRepository.create(data)
      return this.paymentRepository.save(payment)
    }  
  } 

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: any) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
