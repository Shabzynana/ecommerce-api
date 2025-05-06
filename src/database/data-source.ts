import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { Token } from 'src/token/entities/token.entity';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { Cart, CartItem } from 'src/cart/entities/cart.entity';
import { Order, OrderItem } from 'src/order/entities/order.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Address } from 'src/address/entities/address.entity';


dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

const dataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: [User, Token, Address, Product, Category, Cart, CartItem, Order, OrderItem, Payment],
  migrations: [process.env.DB_MIGRATIONS],
  synchronize: isDevelopment,
  migrationsTableName: 'migrations',
  ssl: process.env.DB_SSL === 'true',
});
export async function initializeDataSource() {
  // if (!dataSource.isInitialized) {
  //   await dataSource.initialize();
  // }
  // return dataSource;

  if (!dataSource.isInitialized) {
    try {
      await dataSource.initialize();
      console.log('✅ DataSource initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing DataSource:', error);
      throw error;
    }
  }
  return dataSource;
}

export default dataSource;