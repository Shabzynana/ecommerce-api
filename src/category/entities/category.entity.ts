import { AbstractBaseEntity } from 'src/database/base.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Category extends AbstractBaseEntity {

  @Column({ unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

}