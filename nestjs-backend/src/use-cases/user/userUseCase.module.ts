import { Module } from '@nestjs/common';
import { UserUseCases } from './user.usecase';
import { UserServiceModule } from 'src/services/user/user.module';
import { RedisServiceModule } from 'src/services/redis/redis.module';

@Module({
  imports: [UserServiceModule, RedisServiceModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCaseModule {}
