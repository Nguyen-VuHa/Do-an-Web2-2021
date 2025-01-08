import { Controller, Get, Param } from '@nestjs/common';
import {
  MovieClientDetailResponseDTO,
  MovieClientResponseDTO,
  MovieTopWeekResponseDTO,
} from 'src/core/dtos/movie.dto';
import { IResponse } from 'src/core/types/common';
import { MovieUseCases } from 'src/use-cases/movie/movie.usecase';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieUseCase: MovieUseCases) {}

  @Get('top-week')
  async getMovieTopWeek(): Promise<IResponse<MovieTopWeekResponseDTO>> {
    return this.movieUseCase.getTopWeekMovie();
  }

  @Get('')
  async getMovieClient(): Promise<IResponse<MovieClientResponseDTO>> {
    return this.movieUseCase.getMovie();
  }

  @Get('/:movie_id')
  async getMovieClientDetail(
    @Param('movie_id') movie_id: string
  ): Promise<IResponse<MovieClientDetailResponseDTO>> {
    return this.movieUseCase.getMovieDetail(movie_id);
  }
}
