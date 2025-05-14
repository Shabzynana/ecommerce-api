import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto, updateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async allCategories() {
    return await this.categoryService.allCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Get('name/:name')
  async getCategoryByName(@Param('name') name: string) {
    return this.categoryService.getCategoryByName(name);
  }

  @Patch(':id')
  async updateCategory(@Param('id') id: string, @Body() dto: updateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Get('product/:name')
  async productCategory(@Param('name') name: string) {
    return this.categoryService.productCategory(name);
  }
}
