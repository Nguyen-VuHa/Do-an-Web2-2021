import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { GlobalHttpModule } from 'src/config/axios';
import { AdminShowtimeUseCaseModule } from 'src/use-cases/(admin)/showtime/showtimeUseCase.module';

@Module({
  imports: [GlobalHttpModule, AdminShowtimeUseCaseModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskServiceModule {}
