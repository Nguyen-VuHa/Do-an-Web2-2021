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

  async getPosterByID(poster_id: number): Promise<MoviePoster> {
    return await this.posterRepository.findOne({
      where: {
        movie_poster_id: poster_id,
      },
    });
  }

  async createPoster(posterData: MoviePoster): Promise<MoviePoster> {
    return await this.posterRepository.save(posterData);
  }

  async updatePoster(posterData: MoviePoster): Promise<MoviePoster> {
    return await this.posterRepository.save(posterData);
  }
}
