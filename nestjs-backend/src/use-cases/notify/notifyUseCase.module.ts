import { Module } from '@nestjs/common';
import { NotifyUseCases } from './notify.usecase';
import { NotifyServiceModule } from 'src/services/notify/notify.module';
import { NotifyProcessor } from './notify.processer';

@Module({
  imports: [NotifyServiceModule],
  providers: [NotifyUseCases, NotifyProcessor],
  exports: [NotifyUseCases, NotifyProcessor],
})
export class NotifyUseCaseModule {}
