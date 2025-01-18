import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Đảm bảo rằng ConfigModule được import
    BullModule.registerQueueAsync(
      {
        name: 'booking',
        useFactory: async (configService: ConfigService) => ({
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            username: configService.get<string>('REDIS_USERNAME'),  // Thêm username nếu có
            password: configService.get<string>('REDIS_PASSWORD'),  // Thêm password nếu có
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'email',
        useFactory: async (configService: ConfigService) => ({
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            username: configService.get<string>('REDIS_USERNAME'),  // Thêm username nếu có
            password: configService.get<string>('REDIS_PASSWORD'),  // Thêm password nếu có
          },
        }),
        inject: [ConfigService],
      }
    ),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueServiceModule {}
