import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { ProductDto, updateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService

  ) {}
  async createProduct(dto: ProductDto) {

    const product = await this.productRepository.create({
      ...dto,
      category: { id: dto.category }
    });
    return await this.productRepository.save(product);
   
  }

  async allProduct() {
    return await this.productRepository.find({ 
      relations: ['category'],
      select : {
        id: true,
        name: true,
        description: true,
        price: true,
        category: {
          id: true,
          name: true
        }
      } 
    });
  }

  async getProuctById(id: string) {

    const product = await this.productRepository.findOne({
      where: { id : id }, relations: ['category'],
    });
    return product;
  }

  async updateProduct(id: string, dto: updateProductDto) {

    const product = await this.getProuctById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (dto.category) {
      const category = await this.categoryService.getCategoryById(dto.category);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    const { category, ...rest } = dto;

    Object.assign(product, rest);
    return await this.productRepository.save(product);
    
  }

  async deleteProduct(id: string) {

    const product = await this.getProuctById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return await this.productRepository.remove(product);
  }
}
