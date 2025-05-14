import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto, updateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async allCategories() {
    return await this.categoryService.allCategories();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @ApiOperation({ summary: 'Get category by name' })
  @Get('name/:name')
  async getCategoryByName(@Param('name') name: string) {
    return this.categoryService.getCategoryByName(name);
  }
  
  @ApiOperation({ summary: 'Get products by category' })
  @Get('product/:name')
  async productCategory(@Param('name') name: string) {
    return this.categoryService.productCategory(name);
  }
}
