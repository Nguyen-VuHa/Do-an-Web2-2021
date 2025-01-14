import { Module } from '@nestjs/common';
import { StatusService } from './status.service';

@Module({
  imports: [],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusServiceModule {}
