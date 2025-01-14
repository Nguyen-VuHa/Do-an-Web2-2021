import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BOOKING_QUEUE } from 'src/constants/queue';
import { BookingTicketDTO } from 'src/core/dtos/booking.dto';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('booking') private readonly bookingQueue: Queue) {}

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
}
