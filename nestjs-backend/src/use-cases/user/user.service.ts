import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQueryDTO } from 'src/core/dtos/user.dto';
import { User } from 'src/core/entities/user.entity';
import { Like, Repository } from 'typeorm';

const UserFieldSort: Array<string> = ['id', 'email', 'name'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getUsers(@Query() userQuery: UserQueryDTO): Promise<{ data: User[]; total: number }> {
    const whereCondition: Record<string, any> = {};
    let sortOptions: any = {};

    if (userQuery._search) {
      whereCondition.name = Like(`%${userQuery._search.trim()}%`);
    }

    if (userQuery._sort && UserFieldSort.includes(userQuery._sort)) {
      sortOptions = {
        ...sortOptions,
        [userQuery._sort]: userQuery._sort_type || 'ASC',
      };
    }
    
    const [data, total] = await this.userRepository.findAndCount({
      skip: (userQuery._page - 1) * userQuery._page_size,
      take: userQuery._page_size,
      where: whereCondition,
      order: {
        ...sortOptions,
        created_at: 'DESC',
      },
    });

    return {
      data,
      total,
    };
  }
}
