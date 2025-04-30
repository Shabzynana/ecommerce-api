import { Token } from 'src/token/entities/token.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractBaseEntity } from '../../database/base.entity';


@Entity({ name: 'users' })
export class User extends AbstractBaseEntity {

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'customer' })
  role: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true })
  is_verified_date: Date;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

}