import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { categorySeedData, productSeedData } from './seed-data/Category-Product';
import { userSeedData } from './seed-data/user';


@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seedProductCategory() {
    const categories = await this.createCategories();
    await this.createProducts(categories);
  }

  async seedUser() {
    await this.createAdminUsers();
  }


  private async createCategories() {
    const categories = await Promise.all(
      categorySeedData.map(async (data) => {
        const category = this.categoryRepository.create(data);
        return await this.categoryRepository.save(category);
      }),
    );

    return categories;
  }

  private async createProducts(categories: Category[]) {

    const categoryMap = new Map(categories.map((cat) => [cat.name, cat]));
    console.log(categoryMap, 'categoryMap');

    await Promise.all(
      productSeedData.map(async (product) => {
        const category = categoryMap.get(product.category);
        console.log(category, 'category');
        if (!category) {
          throw new Error(`Category '${product.category}' not found.`);
        }

        const productToSave = this.productRepository.create({
          ...product,
          category: { id: category.id },
        });
        await this.productRepository.save(productToSave);
      })
    );
    
  }

  private async createAdminUsers() {

    const userPromise = userSeedData.map(async (data) => {
      const hashedPassword = await AppUtilities.hashPassword(data.password)
      const user = this.userRepository.create({...data, password: hashedPassword});
      await this.userRepository.save(user);
    });

    await Promise.all(userPromise);
  }

  
}
