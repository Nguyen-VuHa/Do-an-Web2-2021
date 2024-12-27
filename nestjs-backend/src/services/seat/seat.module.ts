import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from 'src/core/entities/seat.entity';
import { SeatService } from './seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  providers: [SeatService],
  exports: [SeatService],
})
export class SeatServiceModule {}
