import { Module } from '@nestjs/common';
import { AdminCinemaServiceModule } from 'src/services/cinema/cinema.module';
import { ScreenServiceModule } from 'src/services/screen/screen.module';
import { DataSeederService } from './data-seeder.service';

@Module({
  imports: [AdminCinemaServiceModule, ScreenServiceModule],
  providers: [DataSeederService],
  exports: [DataSeederService],
})
export class DataSeederServiceModule {}
