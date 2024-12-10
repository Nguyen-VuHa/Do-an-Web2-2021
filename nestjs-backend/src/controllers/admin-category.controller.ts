import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from 'src/core/dtos/admin-movie-detail';
import { Category } from 'src/core/entities/category.entity';
import { IResponse } from 'src/core/types/common';
import { AdminMovieMetaUseCases } from 'src/use-cases/(admin)/movie-meta/admin-movie-meta.usecase';

@Controller('admin/category')
export class AdminCategoryController {
  constructor(private readonly adminMovieMetaUseCase: AdminMovieMetaUseCases) {}

  @Get('list')
  async getAllCategory(): Promise<IResponse<any>> {
    return this.adminMovieMetaUseCase.getAllCategories();
  }

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async createCategory(@Body() data: CreateCategoryDTO): Promise<IResponse<Category>> {
    return this.adminMovieMetaUseCase.createCategory(data);
  }
}
