import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookingTicketDTO } from 'src/core/dtos/booking.dto';
import { IResponse } from 'src/core/types/common';
import { BookingUseCases } from 'src/use-cases/booking/booking.usecase';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingUseCase: BookingUseCases) {}

  @Post('ticket')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async bookingTicket(@Body() data: BookingTicketDTO): Promise<IResponse<string>> {
    return this.bookingUseCase.bookingTicket(data);
  }
}
