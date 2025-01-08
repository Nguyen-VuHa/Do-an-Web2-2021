import { Module } from '@nestjs/common';
import { ShowtimeUseCases } from './showtime.usecase';
import { MovieServiceModule } from 'src/services/movie/movie.module';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';
import { ShowtimeServiceModule } from 'src/services/showtime/showtime.module';
import { RedisServiceModule } from 'src/services/redis/redis.module';

@Module({
  imports: [
    MovieServiceModule,
    AdminCinemaServiceModule,
    ShowtimeServiceModule,
    RedisServiceModule,
  ],
  providers: [ShowtimeUseCases],
  exports: [ShowtimeUseCases],
})
export class ShowtimeUseCaseModule {}
