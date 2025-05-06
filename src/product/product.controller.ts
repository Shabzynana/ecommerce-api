import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, updateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: ProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Get()
  async allProduct() {
    return await this.productService.allProduct();
  }

  @Get(':id')
  async getProuctById(@Param('id') id: string) {
    return this.productService.getProuctById(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() dto: updateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
