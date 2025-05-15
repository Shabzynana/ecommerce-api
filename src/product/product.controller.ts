import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, updateProductDto } from './dto/product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async allProduct() {
    return await this.productService.allProduct();
  }
  
  @ApiOperation({ summary: 'Get product by id' })
  @Get(':id')
  async getProuctById(@Param('id') id: string) {
    return this.productService.getProuctById(id);
  }

}
