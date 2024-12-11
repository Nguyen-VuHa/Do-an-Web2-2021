import { Module } from '@nestjs/common';
import { MovieServiceModule } from 'src/services/movie/movie.module';
import { AdminMovieUseCases } from './admin-movie.usecase';
import { ActorServiceModule } from 'src/services/actor/actor.module';
import { DirectorServiceModule } from 'src/services/director/director.module';
import { AdminCategoryServiceModule } from 'src/services/category/category.module';

@Module({
  imports: [
    MovieServiceModule,
    ActorServiceModule,
    DirectorServiceModule,
    AdminCategoryServiceModule,
  ],
  providers: [AdminMovieUseCases],
  exports: [AdminMovieUseCases],
})
export class AdminMovieUseCaseModule {}
