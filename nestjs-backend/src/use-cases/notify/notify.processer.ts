import { Processor, WorkerHost } from '@nestjs/bullmq';
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Job } from 'bullmq';
import { NOTIFY__QUEUE } from 'src/constants/queue';
import { Notification, NotifyType } from 'src/core/entities/notification.entity';
import { NotifyService } from 'src/services/notify/notify.service';

@Processor('notify') // Queue chung cho tất cả request
export class NotifyProcessor extends WorkerHost implements OnModuleInit {
  private notifyService: NotifyService;

  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  // Inject MailService khi module được khởi tạo
  onModuleInit() {
    this.notifyService = this.moduleRef.get(NotifyService, { strict: false });
  }

  async process(job: Job) {
    switch (job.name) {
      case NOTIFY__QUEUE:
        console.log(`Processing booking job: ${job.id}`);
        // Sử dụng MailService để gửi email
        await this.handleSaveNotify(job);
      default:
        throw new Error('No job name match');
    }
  }

  async handleSaveNotify(job: Job) {
    const job_data_notify = job.data.notify_data;
    try {
      console.log(`Đang xử lý notify: ${job.id}`);

      const notify = new Notification();

      notify.message = job_data_notify.message;
      notify.image_url = job_data_notify.image_url;
      notify.user = job_data_notify.user;

      if (job_data_notify.redirect_url) {
        notify.redirect_url = job_data_notify.redirect_url;
        notify.notify_type = NotifyType.LINK;
      }

      await this.notifyService.createNotify(notify);

      console.log(`Xử lý xong notify: ${job.id}`);

      await job.isCompleted();
    } catch (error) {
      console.log(error.message);
      // handle push message error to user.
      await job.isFailed();
      return error;
    }
  }
}
