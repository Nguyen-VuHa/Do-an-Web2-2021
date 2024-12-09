import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createCategory(categoryData: Category): Promise<Category> {
    return await this.categoryRepository.save(categoryData);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        deleted_at: null,
      },
    });
  }
}
