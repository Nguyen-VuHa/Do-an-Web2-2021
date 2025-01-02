import { Module } from '@nestjs/common';
import { AdminShowtimeUseCases } from './showtime.usecase';
import { ShowtimeServiceModule } from 'src/services/showtime/showtime.module';
import { MovieServiceModule } from 'src/services/movie/movie.module';
import { ScreenServiceModule } from 'src/services/screen/screen.module';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';

@Module({
  imports: [
    ShowtimeServiceModule,
    MovieServiceModule,
    ScreenServiceModule,
    AdminCinemaServiceModule,
  ],
  providers: [AdminShowtimeUseCases],
  exports: [AdminShowtimeUseCases],
})
export class AdminShowtimeUseCaseModule {}
