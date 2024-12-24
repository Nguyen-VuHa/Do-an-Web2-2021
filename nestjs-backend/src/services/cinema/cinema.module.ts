import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from 'src/core/entities/cinema.entity';
import { CinemaService } from './cinema.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema])],
  providers: [CinemaService],
  exports: [CinemaService],
})
export class AdminCinemaServiceModule {}
