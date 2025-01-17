import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processer';
import { MailService } from './mail.service';

@Module({
  imports: [],
  providers: [MailService, EmailProcessor],
  exports: [MailService, EmailProcessor],
})
export class MailServiceModule {}
