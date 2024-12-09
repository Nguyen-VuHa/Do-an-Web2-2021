import { Module } from '@nestjs/common';
import { AdminCategoryUseCases } from './admin-category.usecase';
import { AdminCategoryServiceModule } from 'src/services/category/category.module';

@Module({
  imports: [AdminCategoryServiceModule],
  providers: [AdminCategoryUseCases],
  exports: [AdminCategoryUseCases],
})
export class AdminCategoryUseCaseModule {}
