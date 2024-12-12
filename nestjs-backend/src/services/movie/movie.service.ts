import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/core/entities/movie.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async getPaginationMovieByCondition(conditions: IObject<any>): Promise<[Movie[], number]> {
    return await this.movieRepository.findAndCount(conditions);
  }

  async getDetailMovieByCondition(conditions: IObject<any>): Promise<Movie> {
    return await this.movieRepository.findOne(conditions);
  }

  async getMovieDetailForUpdate(movie_id: string): Promise<Movie> {
    return await this.movieRepository.findOne({
      where: {
        movie_id: movie_id,
      },
      relations: ['categories', 'actors', 'director'],
      withDeleted: true,
    });
  }

  async createMovie(movieData: Movie): Promise<Movie> {
    return await this.movieRepository.save(movieData);
  }

  async updateMovie(movieData: Movie): Promise<Movie> {
    return await this.movieRepository.save(movieData);
  }

  async softDeleteMovie(movie_id: string): Promise<any> {
    const movie = await this.movieRepository.findOne({
      where: { movie_id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return await this.movieRepository.softRemove(movie);
  }

  async unSoftDeleteMovie(movie_id: string): Promise<any> {
    return await this.movieRepository.update(movie_id, {
      deleted_at: null, // Khôi phục lại bản ghi
    });
  }
}
