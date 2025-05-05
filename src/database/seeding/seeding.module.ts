import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import dataSource from '../data-source';
import { SeedService } from './seeding.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([Product, Category])
  ],
  providers: [SeedService],
  exports: [SeedService]
})
export class SeedModule {}
