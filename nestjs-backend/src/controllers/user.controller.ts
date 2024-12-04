import { Controller, Get, Query } from '@nestjs/common';
import { UserQueryDTO, UserResponseDTO } from 'src/core/dtos/user.dto';
import { Pagination } from 'src/core/types/common';
import { UserUseCases } from 'src/use-cases/user/user.useCase';

@Controller('users')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  async getUsers(@Query() userQuery: UserQueryDTO): Promise<Pagination<UserResponseDTO>> {
    userQuery = {
      ...userQuery,
      _page: userQuery._page || 1,
      _page_size: userQuery._page_size || 10,
    };

    return this.userUseCases.getUserPagination(userQuery);
  }
}
