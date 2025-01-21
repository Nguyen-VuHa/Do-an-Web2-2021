import { MailService } from './mail.service';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Job } from 'bullmq';
import { EMAIL_BOOKING_SUCCESS_QUEUE, EMAIL_VERIFY_QUEUE } from 'src/constants/queue';

@Processor('email') // Queue chung cho tất cả request
export class EmailProcessor extends WorkerHost implements OnModuleInit {
  private mailService: MailService;

  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  // Inject MailService khi module được khởi tạo
  onModuleInit() {
    this.mailService = this.moduleRef.get(MailService, { strict: false });
  }

  // Xử lý công việc
  async process(job: Job) {
    switch (job.name) {
      case EMAIL_VERIFY_QUEUE:
        console.log(`Processing email job: ${job.id}`);
        const jobData = job.data.email_data;
        // Sử dụng MailService để gửi email
        await this.mailService.sendVerifyMail(jobData);
      case EMAIL_BOOKING_SUCCESS_QUEUE:
        console.log(`Processing email booking success job: ${job.id}`);
        const jobBookingSuccess = job.data.email_data;
        // Sử dụng MailService để gửi email
        await this.mailService.sendMailBookingSuccess(jobBookingSuccess);
      default:
        throw new Error('No job name match');
    }
  }
}
