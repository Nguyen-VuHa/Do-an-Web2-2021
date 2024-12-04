import { Injectable, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDTO, UserResponseDTO } from 'src/core/dtos/user.dto';
import { Pagination } from 'src/core/types/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserUseCases {
  constructor(private readonly userSevice: UserService) {}

  async getUserPagination(@Query() userQuery: UserQueryDTO): Promise<Pagination<UserResponseDTO>> {
    const { data, total } = await this.userSevice.getUsers(userQuery);

    const userDTO = plainToClass(UserResponseDTO, data, { excludeExtraneousValues: true });

    return {
      data: userDTO,
      total,
      page: userQuery._page,
      limit: userQuery._page_size,
    };
  }
}
