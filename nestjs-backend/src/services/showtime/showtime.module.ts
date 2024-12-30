import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showtime } from 'src/core/entities/showtime.entity';
import { ShowtimeService } from './showtime.service';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime])],
  providers: [ShowtimeService],
  exports: [ShowtimeService],
})
export class ShowtimeServiceModule {}
