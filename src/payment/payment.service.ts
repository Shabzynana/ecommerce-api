import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';

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
      if (existingPayment.status === PaymentStatus.SUCCESS) {
        console.log('data already exist', 'success')
        return existingPayment;
      }
  
      const updated = this.paymentRepository.merge(existingPayment, data);
      console.log('data already exist', 'updated')
      return this.paymentRepository.save(updated);
    }
  
    const newPayment = this.paymentRepository.create(data);
    console.log('newPayment', 'data created')
    return this.paymentRepository.save(newPayment);
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
