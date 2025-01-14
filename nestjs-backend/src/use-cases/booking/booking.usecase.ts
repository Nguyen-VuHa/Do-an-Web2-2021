import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingTicketDTO } from 'src/core/dtos/booking.dto';
import { IResponse } from 'src/core/types/common';
import { BookingService } from 'src/services/booking/booking.service';
import { QueueService } from 'src/services/queue/queue.service';
import { In } from 'typeorm';

@Injectable()
export class BookingUseCases {
  constructor(
    private readonly queueService: QueueService,
    private readonly bookingService: BookingService
  ) {}

  async bookingTicket(data: BookingTicketDTO): Promise<IResponse<string>> {
    try {
      // check seat có bị ng khác đặt chưa trươcs khi đưa vô queue
      const seat_ids = data.seats.map((seat) => seat.seat_id);

      // // check ghế chọn đã tồn tại chưa
      const check_seat = await this.bookingService.getBookingByCondition({
        where: {
          movie: {
            movie_id: data.movie_id,
          },
          screen: {
            screen_id: data.screen_id,
          },
          showtime: {
            showtime_id: data.showtime_id,
          },
          history: {
            seat: {
              seat_id: In(seat_ids),
            },
          },
        },
      });

      if (check_seat) {
        throw new Error('Đã có ai đó đặt ghế nằm trong danh sách bạn chọn, vui lòng chọn lại ghế!');
      }

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
