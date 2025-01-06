import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from 'src/core/entities/cinema.entity';
import { CinemaService } from './cinema.service';
import { CinemaBanner } from 'src/core/entities/cinema-banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema, CinemaBanner])],
  providers: [CinemaService],
  exports: [CinemaService],
})
export class AdminCinemaServiceModule {}
