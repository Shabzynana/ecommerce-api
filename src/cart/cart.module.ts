import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem } from './entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Token } from 'src/token/entities/token.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart,CartItem,Product,Token]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
