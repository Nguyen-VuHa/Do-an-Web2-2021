import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EMAIL_VERIFY_QUEUE } from 'src/constants/queue';
import { MailService } from './mail.service';

@Processor('email') // Queue chung cho tất cả request
export class EmailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process(EMAIL_VERIFY_QUEUE) // Xử lý job đặt vé
  async handleBooking(job: Job) {
    const jobData = job.data.email_data;

    try {
      console.log(`Đang xử lý email: ${job.id}`);
      await this.mailService.sendVerifyMail(jobData);
      console.log(`Xử lý xong email: ${job.id}`);

      await job.isCompleted();
    } catch (error) {
      console.log(error.message);
      await job.isFailed();
      return error;
    }
  }
}
