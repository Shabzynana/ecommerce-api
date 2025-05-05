import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto, updateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() dto: CategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

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
}
