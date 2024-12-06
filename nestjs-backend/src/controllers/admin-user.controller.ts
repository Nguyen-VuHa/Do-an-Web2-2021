import { Controller, Get, Req } from '@nestjs/common';
import { IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { AdminUserUseCases } from 'src/use-cases/(admin)/user/admin-user.usecase';

@Controller('admin/user')
export class AdminUserController {
  constructor(private readonly adminUserUseCases: AdminUserUseCases) {}

  @Get('info')
  async getUserInfo(
    @Req() req: Request & { user: IJWTUserInfo }
  ): Promise<IResponse<IJWTUserInfo>> {
    const { user } = req;

    const userInfo: IJWTUserInfo = {
      user_id: user.user_id,
      email: user.email,
      fullname: user.fullname,
    };

    return {
      statusCode: 200,
      error: null,
      message: 'Truy xuất thông tin thành công.',
      data: userInfo,
    };
  }
}
