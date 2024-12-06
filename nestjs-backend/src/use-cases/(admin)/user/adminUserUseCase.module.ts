import { Module } from '@nestjs/common';
import { SystemUserServiceModule } from 'src/services/system-user/system-user.module';
import { AdminUserUseCases } from './admin-user.usecase';

@Module({
  imports: [SystemUserServiceModule],
  providers: [AdminUserUseCases],
  exports: [AdminUserUseCases],
})
export class AdminUserUseCaseModule {}
