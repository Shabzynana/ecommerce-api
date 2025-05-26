import { Address } from 'src/address/entities/address.entity';
import { AbstractBaseEntity } from 'src/database/base.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum PayStatus {
  UNPAID = 'unpaid',
  PAID = 'paid'
}

@Entity('orders')
export class Order extends AbstractBaseEntity {

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  orderStatus: OrderStatus;
  
  @Column({
    'type': 'enum',
    enum: PayStatus,
    default: PayStatus.UNPAID
  })
  payStatus: PayStatus;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @ManyToOne(() => Address, { eager: true })
  shippingAddress: Address;

  @Column({ unique : true })
  trackingNumber?: string;

  @Column({ nullable: true })
  notes?: string;

}

@Entity('order_items')
export class OrderItem extends AbstractBaseEntity {

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

}
