import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: 'booking',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          redis: configService.get<string>('REDIS_QUEUE_URL'),
        }),
      },
      {
        name: 'email',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          redis: configService.get<string>('REDIS_QUEUE_URL'),
        }),
      }
    ),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueServiceModule {}
