import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { GetNotifyQueryDto, NotifyResponseDTO } from 'src/core/dtos/notify.dto';
import { IPagination, IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { NotifyService } from 'src/services/notify/notify.service';

@Injectable()
export class NotifyUseCases {
  constructor(private readonly notifyService: NotifyService) {}

  async getNorifyPagination(
    user: IJWTUserInfo,
    query: GetNotifyQueryDto
  ): Promise<IResponse<IPagination<NotifyResponseDTO>>> {
    try {
      const [notify, total] = await this.notifyService.getPaginationNotifyByCondition({
        where: {
          user: {
            user_id: user.user_id,
          },
        },
        take: query._page_size,
        skip: (query._page - 1) * query._page_size,
        order: {
          created_at: 'DESC',
        },
      });

      const notifyDTO = plainToClass(NotifyResponseDTO, notify, {
        excludeExtraneousValues: true,
      });

      const notifyPagination: IPagination<NotifyResponseDTO> = {
        page: query._page,
        limit: query._page_size,
        total: total,
        list: notifyDTO,
      };

      const response: IResponse<IPagination<NotifyResponseDTO>> = {
        statusCode: 200,
        error: null,
        message: 'Lấy thông báo thành công.',
        data: notifyPagination,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy thông báo thất bại.',
        error: error.message,
      });
    }
  }
}
