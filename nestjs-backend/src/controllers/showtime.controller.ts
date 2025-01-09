import { Controller, Get, Param } from '@nestjs/common';
import {
  ShowtimeByCinemaResponseDTO,
  ShowtimeByMovieResponseDTO,
} from 'src/core/dtos/showtime.dto';
import { IResponse } from 'src/core/types/common';
import { ShowtimeUseCases } from 'src/use-cases/showtime/showtime.usecase';

@Controller('showtime')
export class ShowtimeController {
  constructor(private readonly showtimeUsecase: ShowtimeUseCases) {}

  @Get('/by-cinema/:slug')
  async getShowtimeByCinema(
    @Param('slug') slug: string
  ): Promise<IResponse<ShowtimeByCinemaResponseDTO[]>> {
    return this.showtimeUsecase.getShowtimeByCinema(slug);
  }

  @Get('/by-movie/:movie_id')
  async getShowtimeByMovie(
    @Param('movie_id') movie_id: string
  ): Promise<IResponse<ShowtimeByMovieResponseDTO>> {
    return this.showtimeUsecase.getShowtimeByMovie(movie_id);
  }
}
