import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/core/entities/notification.entity';
import { NotifyService } from './notify.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyServiceModule {}
