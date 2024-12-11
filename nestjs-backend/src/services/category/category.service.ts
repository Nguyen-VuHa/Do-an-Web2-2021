import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/entities/category.entity';
import { IObject } from 'src/core/types/common';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createCategory(categoryData: Category): Promise<Category> {
    return await this.categoryRepository.save(categoryData);
  }

  async updateCategory(category_id: number, categoryData: Category): Promise<any> {
    return await this.categoryRepository.update(category_id, categoryData);
  }

  async softDeleteCategory(category_id: number): Promise<any> {
    const category = await this.categoryRepository.findOne({
      where: { category_id, deleted_at: IsNull() },
    });
    if (!category) {
      throw new Error(`Category with ID ${category_id} not found`);
    }
    return await this.categoryRepository.softRemove(category);
  }

  async unSoftDeleteCategory(category_id: number): Promise<any> {
    return await this.categoryRepository.update(category_id, {
      deleted_at: null, // Khôi phục lại bản ghi
    });
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        deleted_at: null,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getCategoryByWhere(conditions: IObject<any>): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: conditions,
      withDeleted: true,
    });
  }

  async getCategoriesListByIds(category_ids: number[]): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        category_id: In(category_ids),
      },
    });
  }
}
