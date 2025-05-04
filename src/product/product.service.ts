import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

  ) {}
  async createProduct(dto: ProductDto) {

    const product = await this.productRepository.create({
      ...dto,
      category: { id: dto.category }
    });
    return await this.productRepository.save(product);
   
  }

  async allProduct() {
    return await this.productRepository.find();
  }

  async getProuctById(id: string) {

    const product = await this.productRepository.findOne({ where: { id : id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, dto: ProductDto) {

    const product = await this.getProuctById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await this.productRepository.save({
       ...dto,
       category: { id: dto.category },
    });
    
  }

  async deleteProduct(id: string) {

    const product = await this.getProuctById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await this.productRepository.remove(product);
  }
}
