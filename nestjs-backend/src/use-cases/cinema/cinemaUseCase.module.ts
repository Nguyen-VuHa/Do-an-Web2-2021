import { Module } from '@nestjs/common';
import { CinemaUseCases } from './cinema.usecase';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';
import { ScreenServiceModule } from 'src/services/screen/screen.module';

@Module({
  imports: [AdminCinemaServiceModule, ScreenServiceModule],
  providers: [CinemaUseCases],
  exports: [CinemaUseCases],
})
export class CinemaUseCaseModule {}
