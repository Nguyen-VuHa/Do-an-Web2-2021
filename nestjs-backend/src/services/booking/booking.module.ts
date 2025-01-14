import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingHistory } from 'src/core/entities/booking-history.entity';
import { Booking } from 'src/core/entities/booking.entity';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingHistory])],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingServiceModule {}
