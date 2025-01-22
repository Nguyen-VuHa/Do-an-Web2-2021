import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import {
  BOOKING_QUEUE,
  EMAIL_BOOKING_SUCCESS_QUEUE,
  EMAIL_VERIFY_QUEUE,
  NOTIFY__QUEUE,
} from 'src/constants/queue';
import { BookingTicketDTO } from 'src/core/dtos/booking.dto';
import { IEmailVerifyRequest } from 'src/core/types/email.type';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('booking') private readonly bookingQueue: Queue,
    @InjectQueue('email') private readonly emailQueue: Queue,
    @InjectQueue('notify') private readonly notifyQueue: Queue
  ) {}

  async pushToQueue(user_id: string, booking_detail: BookingTicketDTO): Promise<void> {
    const jobOptions = {
      removeOnComplete: true, // Xóa job khi hoàn thành
      removeOnFail: true, // Xóa job khi thất bại
    };

    // Thêm job vào queue
    await this.bookingQueue.add(
      BOOKING_QUEUE,
      {
        user_id,
        booking_detail,
      },
      jobOptions
    );

    console.log(`Đã thêm job vào queue cho user: ${user_id}`);
  }

  async pushToQueueSendMail(user_id: string, email_data: IEmailVerifyRequest): Promise<void> {
    const jobOptions = {
      removeOnComplete: true, // Xóa job khi hoàn thành
      removeOnFail: true, // Xóa job khi thất bại
    };

    // Thêm job vào queue
    await this.emailQueue.add(
      EMAIL_VERIFY_QUEUE,
      {
        user_id,
        email_data,
      },
      jobOptions
    );

    console.log(`Đã thêm job vào queue cho user: ${user_id}`);
  }

  async pushToQueueSendMailBookingSuccess(email_data: any): Promise<void> {
    const jobOptions = {
      removeOnComplete: true, // Xóa job khi hoàn thành
      removeOnFail: true, // Xóa job khi thất bại
    };

    // Thêm job vào queue
    await this.emailQueue.add(
      EMAIL_BOOKING_SUCCESS_QUEUE,
      {
        email_data,
      },
      jobOptions
    );

    console.log(`Đã thêm job vào send email booking success`);
  }

  async pushToQueueSaveNotify(notify_data: any): Promise<void> {
    const jobOptions = {
      removeOnComplete: true, // Xóa job khi hoàn thành
      removeOnFail: true, // Xóa job khi thất bại
    };

    // Thêm job vào queue
    await this.notifyQueue.add(
      NOTIFY__QUEUE,
      {
        notify_data,
      },
      jobOptions
    );

    console.log(`Đã thêm job vào notify saving`);
  }
}
