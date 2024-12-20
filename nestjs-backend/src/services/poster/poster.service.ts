import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviePoster } from 'src/core/entities/movie-poster.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PosterService {
  constructor(
    @InjectRepository(MoviePoster)
    private posterRepository: Repository<MoviePoster>
  ) {}

  async createPoster(posterData: MoviePoster): Promise<MoviePoster> {
    return await this.posterRepository.save(posterData);
  }
}
