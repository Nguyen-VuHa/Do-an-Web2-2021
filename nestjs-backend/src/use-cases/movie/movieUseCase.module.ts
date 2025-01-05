import { Module } from '@nestjs/common';
import { MovieServiceModule } from 'src/services/movie/movie.module';
import { MovieUseCases } from './movie.usecase';

@Module({
  imports: [MovieServiceModule],
  providers: [MovieUseCases],
  exports: [MovieUseCases],
})
export class MovieUseCaseModule {}
