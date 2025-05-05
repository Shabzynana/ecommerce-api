import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto, updateCategoryDto } from './dto/create-category.dto';
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
      throw new BadRequestException('Category not found');
    }
    return category;
  }

  async getCategoryByName(name: string) {
    const category = await this.categoryRepository.findOne({ where: { name : name } });
    return category;
  }

  async updateCategory(id: string, dto: updateCategoryDto) {
    const category = await this.getCategoryById(id);
    if (dto.name) {
      const existing = await this.getCategoryByName(dto.name);

      if (existing && existing.id !== category.id) {
        throw new BadRequestException('Category name already exists.');
      }
    }
    return await this.categoryRepository.save({ ...category, ...dto });
  }

  async deleteCategory(id: string) {
    const category = await this.getCategoryById(id);
    await this.categoryRepository.remove(category);
    return 'Category deleted successfully'
  }

  async productCategory(name: string) {

    const category = await this.getCategoryByName(name);
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    
    const product = await this.categoryRepository.find({
      where: { id: category.id },
      relations: ['products'],
    });

    return product;

  }
}
