import { Module } from '@nestjs/common';
import { AdminScreenUseCases } from './screen.usecase';
import { ScreenServiceModule } from 'src/services/screen/screen.module';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';

@Module({
  imports: [ScreenServiceModule, AdminCinemaServiceModule],
  providers: [AdminScreenUseCases],
  exports: [AdminScreenUseCases],
})
export class AdminScreenUseCaseModule {}
