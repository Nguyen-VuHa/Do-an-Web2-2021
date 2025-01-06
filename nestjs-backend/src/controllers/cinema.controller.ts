import { Controller, Get } from '@nestjs/common';
import { CinemaClientResponseDTO } from 'src/core/dtos/cinema.dto';
import { IResponse } from 'src/core/types/common';
import { CinemaUseCases } from 'src/use-cases/cinema/cinema.usecase';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaUseCase: CinemaUseCases) {}

  @Get('')
  async getCinemaClient(): Promise<IResponse<CinemaClientResponseDTO[]>> {
    return this.cinemaUseCase.getCinema();
  }
}
