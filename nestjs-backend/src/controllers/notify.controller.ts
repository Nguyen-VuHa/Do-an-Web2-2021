import { Controller, Get, Put, Query, Req } from '@nestjs/common';
import { MAX_PAGE_SIZE, PAGE_IDX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/constants/default';
import { GetNotifyQueryDto, NotifyResponseDTO } from 'src/core/dtos/notify.dto';
import { IPagination, IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { NotifyUseCases } from 'src/use-cases/notify/notify.usecase';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyUsecase: NotifyUseCases) {}
  @Get('list')
  async getUserInfo(
    @Req() req: Request & { user: IJWTUserInfo },
    @Query() query: GetNotifyQueryDto
  ): Promise<IResponse<IPagination<NotifyResponseDTO>>> {
    const { user } = req;
    const { _page, _page_size } = query;

    let pageSize = PAGE_SIZE_DEFAULT;

    if (_page_size) {
      pageSize = _page_size > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : _page_size;
    }

    const queryClean: GetNotifyQueryDto = {
      ...query,
      _page: _page || PAGE_IDX_DEFAULT,
      _page_size: pageSize,
    };

    return this.notifyUsecase.getNorifyPagination(user, queryClean);
  }

  @Put('status')
  async updateNotifyToRead(
    @Req() req: Request & { user: IJWTUserInfo }
  ): Promise<IResponse<boolean>> {
    const { user } = req;
    return this.notifyUsecase.updateStatusNotifyToRead(user);
  }
}
