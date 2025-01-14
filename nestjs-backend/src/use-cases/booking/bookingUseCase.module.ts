import { Module } from '@nestjs/common';
import { BookingServiceModule } from 'src/services/booking/booking.module';
import { MovieServiceModule } from 'src/services/movie/movie.module';
import { QueueServiceModule } from 'src/services/queue/queue.module';
import { ScreenServiceModule } from 'src/services/screen/screen.module';
import { SeatServiceModule } from 'src/services/seat/seat.module';
import { ShowtimeServiceModule } from 'src/services/showtime/showtime.module';
import { UserServiceModule } from 'src/services/user/user.module';
import { BookingProcessor } from './booking.processer';
import { BookingUseCases } from './booking.usecase';

@Module({
  imports: [
    QueueServiceModule,
    BookingServiceModule,
    UserServiceModule,
    MovieServiceModule,
    ScreenServiceModule,
    SeatServiceModule,
    ShowtimeServiceModule,
  ],
  providers: [BookingUseCases, BookingProcessor],
  exports: [BookingUseCases, BookingProcessor],
})
export class BookingUseCaseModule {}
