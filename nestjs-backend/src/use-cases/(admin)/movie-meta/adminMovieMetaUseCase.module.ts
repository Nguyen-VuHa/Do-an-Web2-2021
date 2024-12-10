import { Module } from '@nestjs/common';
import { AdminCategoryServiceModule } from 'src/services/category/category.module';
import { AdminMovieMetaUseCases } from './admin-movie-meta.usecase';
import { DirectorServiceModule } from 'src/services/director/director.module';

@Module({
  imports: [AdminCategoryServiceModule, DirectorServiceModule],
  providers: [AdminMovieMetaUseCases],
  exports: [AdminMovieMetaUseCases],
})
export class AdminMovieMetaUseCaseModule {}
