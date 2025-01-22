import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { REDIS_USER_CLIENT_INFO_KEY, REDIS_USER_CLIENT_INFO_TTL } from 'src/constants/redis';
import { UserClientResponseDTO } from 'src/core/dtos/user.dto';
import { IObject, IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { NotifyService } from 'src/services/notify/notify.service';
import { RedisService } from 'src/services/redis/redis.service';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly notifyService: NotifyService
  ) {}

  async getUserInfo(user: IJWTUserInfo): Promise<IResponse<UserClientResponseDTO>> {
    try {
      const notifyUnRead = await this.notifyService.countNotifyUnRead(user.user_id);

      const keyCache = `${REDIS_USER_CLIENT_INFO_KEY}_${user.user_id}`;

      const dataCache: IObject<any> = await this.redisService.getDataRedis(keyCache);
      const response: IResponse<UserClientResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy thông tin thành công.',
      };

      if (dataCache) {
        response.data = dataCache as UserClientResponseDTO;
        response.data.notify_unread = notifyUnRead;

        return response;
      }

      const userDetail = await this.userService.getUserByID(user.user_id);

      if (!userDetail) {
        throw new HttpException('Access Denied: Invalid credentials', HttpStatus.FORBIDDEN);
      }

      const userDetailDTO = plainToClass(UserClientResponseDTO, userDetail, {
        excludeExtraneousValues: true,
      });

      response.data = userDetailDTO;
      response.data.notify_unread = notifyUnRead;

      this.redisService.setDataRedis(keyCache, userDetailDTO, REDIS_USER_CLIENT_INFO_TTL);

      return response;
    } catch (error) {
      if (error instanceof HttpException && error.getStatus() === HttpStatus.FORBIDDEN) {
        throw new HttpException('Access Denied: Invalid credentials', HttpStatus.FORBIDDEN);
      }

      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy thông tin thất bại.',
        error: error.message,
      });
    }
  }
}
