import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/core/types/common';
import { CategoryService } from 'src/services/category/category.service';

@Injectable()
export class AdminCategoryUseCases {
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
}
