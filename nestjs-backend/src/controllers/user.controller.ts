import { Controller, Get, Req } from '@nestjs/common';
import { UserClientResponseDTO } from 'src/core/dtos/user.dto';
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
}
