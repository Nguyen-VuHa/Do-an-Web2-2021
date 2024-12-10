import { BadRequestException, Injectable } from '@nestjs/common';
import { ERROR_CODE_DUPLICATE_UNIQUE } from 'src/constants/errors';
import { CreateCategoryDTO } from 'src/core/dtos/admin-movie-detail';
import { Category } from 'src/core/entities/category.entity';
import { IResponse } from 'src/core/types/common';
import { CategoryService } from 'src/services/category/category.service';

@Injectable()
export class AdminMovieMetaUseCases {
  constructor(private readonly categoryService: CategoryService) {}

  async getAllCategories(): Promise<IResponse<any>> {
    try {
      const categories = await this.categoryService.getAllCategories();

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách thể loại thành công.',
        data: categories,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách thể loại không thành công.',
        error: error.message,
      });
    }
  }

  async createCategory(data: CreateCategoryDTO): Promise<IResponse<Category>> {
    try {
      const category = new Category();

      category.category_name = data.category_name;

      const newCategory = await this.categoryService.createCategory(category);

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Tạo mới thể loại thành công.',
        data: newCategory,
      };
      return response;
    } catch (error) {
      let errorResponse: any;
      if (error.code === ERROR_CODE_DUPLICATE_UNIQUE) {
        // mã lỗi trùng lặp trong database
        // PostgreSQL code for unique violation
        errorResponse = 'Thể loại đăng ký đã tồn tại';
      } else {
        errorResponse = error;
      }

      throw new BadRequestException({
        statusCode: 400,
        message: 'Tạo mới thể loại không thành công.',
        error: errorResponse,
      });
    }
  }
}
