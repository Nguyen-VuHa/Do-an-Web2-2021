import { Module } from '@nestjs/common';
import { AdminCinemaUseCases } from './cinema.usecase';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';

@Module({
  imports: [AdminCinemaServiceModule],
  providers: [AdminCinemaUseCases],
  exports: [AdminCinemaUseCases],
})
export class AdminCinemaUseCaseModule {}
