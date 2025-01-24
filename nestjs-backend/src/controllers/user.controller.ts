import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  DetailBookingHistoryResponseDTO,
  UserBookingHistoryResponseDTO,
  UserClientResponseDTO,
  UserEditDTO,
} from 'src/core/dtos/user.dto';
import { IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { UserUseCases } from 'src/use-cases/user/user.usecase';

@Controller('user')
export class UserController {
  constructor(private readonly userUsecase: UserUseCases) {}

  @Get('info')
  async getUserInfo(
    @Req() req: Request & { user: IJWTUserInfo }
  ): Promise<IResponse<UserClientResponseDTO>> {
    const { user } = req;
    return this.userUsecase.getUserInfo(user);
  }

  @Get('booking-history')
  async getUserBookingHistory(
    @Req() req: Request & { user: IJWTUserInfo }
  ): Promise<IResponse<UserBookingHistoryResponseDTO[]>> {
    const { user } = req;
    return this.userUsecase.getUserBookingHistory(user);
  }

  @Put('update')
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
  async updateUserInfo(
    @Req() req: Request & { user: IJWTUserInfo },
    @Body() userInfo: UserEditDTO
  ): Promise<IResponse<boolean>> {
    const { user } = req;
    return this.userUsecase.updateUserInfo(user, userInfo);
  }

  @Get('booking-history/:history_id')
  async getDetailBookingHistory(
    @Req() req: Request & { user: IJWTUserInfo },
    @Param('history_id') history_id: string
  ): Promise<IResponse<DetailBookingHistoryResponseDTO>> {
    const { user } = req;
    return this.userUsecase.getDetailBookingHistory(user, history_id);
  }
}
