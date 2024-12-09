import { Controller, Get } from '@nestjs/common';
import { IResponse } from 'src/core/types/common';
import { AdminCategoryUseCases } from 'src/use-cases/(admin)/category/admin-category.usecase';

@Controller('admin/category')
export class AdminCategoryController {
  constructor(private readonly adminCategoryUseCase: AdminCategoryUseCases) {}

  @Get('list')
  async getUserInfo(): Promise<IResponse<any>> {
    return this.adminCategoryUseCase.getAllCategories();
  }
}
