import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'booking', // Tên queue
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueServiceModule {}
