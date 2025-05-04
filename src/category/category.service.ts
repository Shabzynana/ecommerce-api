import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor (
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async createCategory(dto: CategoryDto) {

    const category = await this.categoryRepository.create(dto);
    return await this.categoryRepository.save(category);
  }

  async allCategories() {
    return await this.categoryRepository.find();
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id : id } });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async updateCategory(id: string, dto: CategoryDto) {
    const category = await this.getCategoryById(id);
    return await this.categoryRepository.save({ ...category, ...dto });
  }

  async deleteCategory(id: string) {
    const category = await this.getCategoryById(id);
    return await this.categoryRepository.delete(category);
  }
}
