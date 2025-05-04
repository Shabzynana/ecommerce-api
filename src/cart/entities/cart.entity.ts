import { AbstractBaseEntity } from 'src/database/base.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';


@Entity('carts')
export class Cart extends AbstractBaseEntity {

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  cartItems: CartItem[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalAmount: number;

}

@Entity('cart_items')
export class CartItem extends AbstractBaseEntity {

  @Column('int')
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

}
