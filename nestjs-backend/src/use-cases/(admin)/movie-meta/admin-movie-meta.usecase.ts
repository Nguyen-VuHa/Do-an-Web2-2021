import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ERROR_CODE_DUPLICATE_UNIQUE } from 'src/constants/errors';
import {
  CategoryResponseDTO,
  CreateCategoryDTO,
  CreateDirectorDTO,
  DirectorResponseDTO,
} from 'src/core/dtos/admin-movie-detail';
import { Category } from 'src/core/entities/category.entity';
import { Director } from 'src/core/entities/director.entity';
import { IResponse } from 'src/core/types/common';
import { CategoryService } from 'src/services/category/category.service';
import { DirectorService } from 'src/services/director/director.service';
import { stringToInt } from 'src/utils/convert';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class AdminMovieMetaUseCases {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly directorService: DirectorService
  ) {}

  async getAllCategories(): Promise<IResponse<CategoryResponseDTO[]>> {
    try {
      const categories = await this.categoryService.getAllCategories();

      const categoryResponse = plainToClass(CategoryResponseDTO, categories, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách thể loại thành công.',
        data: categoryResponse,
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

  async createCategory(data: CreateCategoryDTO): Promise<IResponse<CategoryResponseDTO>> {
    try {
      const existing = await this.categoryService.getCategoryByWhere({
        category_name: data.category_name,
        deleted_at: Not(IsNull()),
      });

      if (existing) {
        await this.categoryService.unSoftDeleteCategory(existing.category_id);

        existing.deleted_at = null;

        const categoryResponse = plainToClass(CategoryResponseDTO, existing, {
          excludeExtraneousValues: true,
        });

        const response: IResponse<any> = {
          statusCode: 200,
          error: null,
          message: 'Tạo mới thể loại thành công.',
          data: categoryResponse,
        };
        return response;
      } else {
        const category = new Category();

        category.category_name = data.category_name;

        const newCategory = await this.categoryService.createCategory(category);

        const categoryResponse = plainToClass(CategoryResponseDTO, newCategory, {
          excludeExtraneousValues: true,
        });

        const response: IResponse<any> = {
          statusCode: 200,
          error: null,
          message: 'Tạo mới thể loại thành công.',
          data: categoryResponse,
        };
        return response;
      }
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

  async deleteCategory(categoryID: string): Promise<IResponse<CategoryResponseDTO>> {
    try {
      const deleteCategory = await this.categoryService.softDeleteCategory(stringToInt(categoryID));

      const categoryResponse = plainToClass(CategoryResponseDTO, deleteCategory, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Xoá thể loại thành công.',
        data: categoryResponse,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Xoá thể loại không thành công.',
        error: error.message,
      });
    }
  }

  async getAllDirectors(): Promise<IResponse<DirectorResponseDTO>> {
    try {
      const directors = await this.directorService.getAllDirectors();

      const directorResponse = plainToClass(DirectorResponseDTO, directors, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách dạo diễn thành công.',
        data: directorResponse,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách đạo diễn không thành công.',
        error: error.message,
      });
    }
  }

  async createDirector(data: CreateDirectorDTO): Promise<IResponse<any>> {
    try {
      const existing = await this.directorService.getDirectorByWhere({
        director_name: data.director_name,
        deleted_at: Not(IsNull()),
      });

      if (existing) {
        await this.directorService.unSoftDeleteDirector(existing.director_id);

        existing.deleted_at = null;

        const directorResponse = plainToClass(DirectorResponseDTO, existing, {
          excludeExtraneousValues: true,
        });

        const response: IResponse<any> = {
          statusCode: 200,
          error: null,
          message: 'Tạo mới đạo diễn thành công.',
          data: directorResponse,
        };
        return response;
      } else {
        const director = new Director();

        director.director_name = data.director_name;

        const newDirector = await this.directorService.createDirectror(director);

        const directorResponse = plainToClass(DirectorResponseDTO, newDirector, {
          excludeExtraneousValues: true,
        });

        const response: IResponse<any> = {
          statusCode: 200,
          error: null,
          message: 'Tạo mới đạo diễn thành công.',
          data: directorResponse,
        };
        return response;
      }
    } catch (error) {
      let errorResponse: any;
      if (error.code === ERROR_CODE_DUPLICATE_UNIQUE) {
        // mã lỗi trùng lặp trong database
        // PostgreSQL code for unique violation
        errorResponse = 'Đạo diễn đăng ký đã tồn tại';
      } else {
        errorResponse = error;
      }

      throw new BadRequestException({
        statusCode: 400,
        message: 'Tạo mới đạo diễn không thành công.',
        error: errorResponse,
      });
    }
  }

  async deleteDirector(directorID: string): Promise<IResponse<DirectorResponseDTO>> {
    try {
      const deleteDirector = await this.directorService.softDeleteDirector(stringToInt(directorID));

      const directorResponse = plainToClass(DirectorResponseDTO, deleteDirector, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Xoá đạo diễn thành công.',
        data: directorResponse,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Xoá đạo diễn không thành công.',
        error: error.message,
      });
    }
  }
}
