import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, updateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async allProduct() {
    return await this.productService.allProduct();
  }

  @Get(':id')
  async getProuctById(@Param('id') id: string) {
    return this.productService.getProuctById(id);
  }

}
