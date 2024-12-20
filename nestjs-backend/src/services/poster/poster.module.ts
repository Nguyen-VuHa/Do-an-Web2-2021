import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviePoster } from 'src/core/entities/movie-poster.entity';
import { PosterService } from './poster.service';

@Module({
  imports: [TypeOrmModule.forFeature([MoviePoster])],
  providers: [PosterService],
  exports: [PosterService],
})
export class PosterServiceModule {}
