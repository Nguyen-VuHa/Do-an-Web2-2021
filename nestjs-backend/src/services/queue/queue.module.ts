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
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            username: configService.get<string>('REDIS_USERNAME_BULL_QUEUE'),
            password: configService.get<string>('REDIS_PASSWORD_BULL_QUEUE'),
          },
        }),
      },
      {
        name: 'email',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            username: configService.get<string>('REDIS_USERNAME_BULL_QUEUE'),
            password: configService.get<string>('REDIS_PASSWORD_BULL_QUEUE'),
          },
        }),
      }
    ),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueServiceModule {}
