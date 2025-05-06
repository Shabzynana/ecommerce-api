import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractBaseEntity } from '../../database/base.entity';

@Entity('addresses')
export class Address extends AbstractBaseEntity {

  @Column()
  street_address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  additionalInfo?: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

}
