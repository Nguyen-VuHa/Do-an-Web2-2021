import { Controller, Get, Param } from '@nestjs/common';
import { CinemaClientResponseDTO, CinemaDetailClientResponseDTO } from 'src/core/dtos/cinema.dto';
import { IResponse } from 'src/core/types/common';
import { CinemaUseCases } from 'src/use-cases/cinema/cinema.usecase';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaUseCase: CinemaUseCases) {}

  @Get('')
  async getCinemaClient(): Promise<IResponse<CinemaClientResponseDTO[]>> {
    return this.cinemaUseCase.getCinema();
  }

  @Get('/:slug')
  async getCinemaClientBySlug(
    @Param('slug') slug: string
  ): Promise<IResponse<CinemaDetailClientResponseDTO>> {
    return this.cinemaUseCase.getCinemaClientBySlug(slug);
  }

  @Get('/area/list')
  async getAllAreaCinema(): Promise<IResponse<string[]>> {
    return this.cinemaUseCase.getAllAreaCinema();
  }
}
