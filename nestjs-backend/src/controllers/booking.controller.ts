import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookingSeatResponseDTO, BookingTicketDTO } from 'src/core/dtos/booking.dto';
import { IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
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
  async bookingTicket(
    @Body() data: BookingTicketDTO,
    @Req() req: Request & { user: IJWTUserInfo }
  ): Promise<IResponse<string | BookingSeatResponseDTO[]>> {
    const { user } = req;
    data.user_id = user.user_id;
    return this.bookingUseCase.bookingTicket(data);
  }
}
