import { CartItem } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderItem } from 'src/order/entities/order.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { AbstractBaseEntity } from '../../database/base.entity';

@Entity()
export class Product extends AbstractBaseEntity {

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  stock?: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

}
