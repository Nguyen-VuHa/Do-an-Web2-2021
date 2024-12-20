import { Module } from '@nestjs/common';
import { MovieServiceModule } from 'src/services/movie/movie.module';
import { AdminMovieUseCases } from './admin-movie.usecase';
import { ActorServiceModule } from 'src/services/actor/actor.module';
import { DirectorServiceModule } from 'src/services/director/director.module';
import { AdminCategoryServiceModule } from 'src/services/category/category.module';
import { PosterServiceModule } from 'src/services/poster/poster.module';

@Module({
  imports: [
    MovieServiceModule,
    ActorServiceModule,
    DirectorServiceModule,
    PosterServiceModule,
    AdminCategoryServiceModule,
  ],
  providers: [AdminMovieUseCases],
  exports: [AdminMovieUseCases],
})
export class AdminMovieUseCaseModule {}
