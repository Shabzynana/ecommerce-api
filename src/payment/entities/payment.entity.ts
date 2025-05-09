import { AbstractBaseEntity } from 'src/database/base.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  ABANDONED = 'abandoned',
  REFUNDED = 'refunded',
  REVERSED = 'reversed'
}

export enum PaymentMethod {
  CARD = 'card',
  BANK = 'bank',
  USSD = 'ussd',
  QR = 'qr',
  MOBILE_MONEY = 'mobile_money',
  BANK_TRANSFER = 'bank_transfer'
}

@Entity('payments')
export class Payment extends AbstractBaseEntity {


  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  status: PaymentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true
  })
  method?: PaymentMethod;

  @Column({ nullable: true, unique: true })
  reference: string;
  
  @Column({ nullable: true })
  accessCode?: string;
  
  @Column({ nullable: true })
  authorizationCode?: string;

  @Column({ nullable: true })
  authorizationUrl?: string;
  
  @Column({ nullable: true, unique: true })
  transactionId?: string;
  
  @Column({ nullable: true, type: 'json' })
  metadata?: Record<string, any>;
  
  @Column({ nullable: true })
  currency?: string = 'NGN';
  
  @Column({ nullable: true })
  customerCode?: string;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

}