import { Module } from '@nestjs/common';
import { AuthUseCases } from './auth.usecase';
import { UserServiceModule } from 'src/services/user/user.module';

@Module({
  imports: [UserServiceModule],
  providers: [AuthUseCases],
  exports: [AuthUseCases],
})
export class AuthUseCaseModule {}
