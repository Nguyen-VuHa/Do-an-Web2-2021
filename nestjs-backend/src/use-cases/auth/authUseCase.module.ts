import { Module } from '@nestjs/common';
import { QueueServiceModule } from 'src/services/queue/queue.module';
import { RedisServiceModule } from 'src/services/redis/redis.module';
import { UserServiceModule } from 'src/services/user/user.module';
import { AuthUseCases } from './auth.usecase';
import { MailServiceModule } from 'src/services/mail/mail.module';

@Module({
  imports: [UserServiceModule, QueueServiceModule, RedisServiceModule, MailServiceModule],
  providers: [AuthUseCases],
  exports: [AuthUseCases],
})
export class AuthUseCaseModule {}
