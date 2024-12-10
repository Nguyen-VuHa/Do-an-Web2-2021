import { Module } from '@nestjs/common';
import { AdminCategoryServiceModule } from 'src/services/category/category.module';
import { AdminMovieMetaUseCases } from './admin-movie-meta.usecase';

@Module({
  imports: [AdminCategoryServiceModule],
  providers: [AdminMovieMetaUseCases],
  exports: [AdminMovieMetaUseCases],
})
export class AdminMovieMetaUseCaseModule {}
