import { Module } from '@nestjs/common';
import { AdminScreenUseCases } from './screen.usecase';
import { ScreenServiceModule } from 'src/services/screen/screen.module';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';
import { SeatServiceModule } from 'src/services/seat/seat.module';

@Module({
  imports: [ScreenServiceModule, AdminCinemaServiceModule, SeatServiceModule],
  providers: [AdminScreenUseCases],
  exports: [AdminScreenUseCases],
})
export class AdminScreenUseCaseModule {}
