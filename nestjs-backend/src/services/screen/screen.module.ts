import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from 'src/core/entities/screen.entity';
import { ScreenService } from './screen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Screen])],
  providers: [ScreenService],
  exports: [ScreenService],
})
export class ScreenServiceModule {}
