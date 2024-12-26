import { Module } from '@nestjs/common';
import { AdminScreenUseCases } from './screen.usecase';
import { ScreenServiceModule } from 'src/services/screen/screen.module';

@Module({
  imports: [ScreenServiceModule],
  providers: [AdminScreenUseCases],
  exports: [AdminScreenUseCases],
})
export class AdminScreenUseCaseModule {}
