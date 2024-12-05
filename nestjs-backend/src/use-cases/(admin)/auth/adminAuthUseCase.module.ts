import { Module } from '@nestjs/common';
import { AdminAuthUseCases } from './admin-auth.usecase';
import { SystemUserServiceModule } from 'src/services/system-user/system-user.module';

@Module({
  imports: [SystemUserServiceModule],
  providers: [AdminAuthUseCases],
  exports: [AdminAuthUseCases],
})
export class AdminAuthUseCaseModule {}
