import { Module } from '@nestjs/common';
import { CinemaUseCases } from './cinema.usecase';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';

@Module({
  imports: [AdminCinemaServiceModule],
  providers: [CinemaUseCases],
  exports: [CinemaUseCases],
})
export class CinemaUseCaseModule {}
