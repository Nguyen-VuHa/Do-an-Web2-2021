import { Module } from '@nestjs/common';
import { BookingServiceModule } from 'src/services/booking/booking.module';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';
import { MovieServiceModule } from 'src/services/movie/movie.module';
import { RedisServiceModule } from 'src/services/redis/redis.module';
import { ShowtimeServiceModule } from 'src/services/showtime/showtime.module';
import { ShowtimeUseCases } from './showtime.usecase';

@Module({
  imports: [
    MovieServiceModule,
    AdminCinemaServiceModule,
    ShowtimeServiceModule,
    RedisServiceModule,
    BookingServiceModule,
  ],
  providers: [ShowtimeUseCases],
  exports: [ShowtimeUseCases],
})
export class ShowtimeUseCaseModule {}
