import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingTicketDTO } from 'src/core/dtos/booking.dto';
import { IResponse } from 'src/core/types/common';
import { QueueService } from 'src/services/queue/queue.service';

@Injectable()
export class BookingUseCases {
  constructor(private readonly queueService: QueueService) {}

  async bookingTicket(data: BookingTicketDTO): Promise<IResponse<string>> {
    try {
      await this.queueService.pushToQueue(data.user_id, data);

      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Đặt vé thành công, hệ thống đang xử lý vui lòng chờ trong giây lát.',
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Đặt vé thất bại, đơn của bạn sẽ được xử lý trong vòng 24h tới.',
        error: error.message,
      });
    }
  }
}
