import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { REDIS_USER_CLIENT_INFO_KEY, REDIS_USER_CLIENT_INFO_TTL } from 'src/constants/redis';
import {
  DetailBookingHistoryResponseDTO,
  UserBookingHistoryResponseDTO,
  UserClientResponseDTO,
  UserEditDTO,
  UserPhotoResponseDTO,
  UserUpdatePhotoDTO,
} from 'src/core/dtos/user.dto';
import { User, UserGender } from 'src/core/entities/user.entity';
import { IObject, IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { BookingService } from 'src/services/booking/booking.service';
import { NotifyService } from 'src/services/notify/notify.service';
import { RedisService } from 'src/services/redis/redis.service';
import { UserService } from 'src/services/user/user.service';
import { stringToDate } from 'src/utils/convert';
import { Multer } from 'multer';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { UserPhoto, UserPhotoType } from 'src/core/entities/user-photo.entity';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly notifyService: NotifyService,
    private readonly bookingService: BookingService,
    private readonly cloudinaryService: CloudinaryService
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

  async updateUserInfo(user: IJWTUserInfo, userInfo: UserEditDTO): Promise<IResponse<boolean>> {
    try {
      const userData = new User();
      userData.fullname = userInfo.fullname;
      userData.birth_day = stringToDate(userInfo.birth_day);
      userData.gender = userInfo.gender as UserGender;

      const resUser = await this.userService.updateUser(user.user_id, userData);

      const userDetailDTO = plainToClass(UserClientResponseDTO, resUser, {
        excludeExtraneousValues: true,
      });

      const keyCache = `${REDIS_USER_CLIENT_INFO_KEY}_${user.user_id}`;
      this.redisService.setDataRedis(keyCache, userDetailDTO, REDIS_USER_CLIENT_INFO_TTL);

      const response: IResponse<boolean> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật thông tin user thành công',
        data: true,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật thông tin user thất bại',
        error: error.message,
      });
    }
  }

  async getUserBookingHistory(
    user: IJWTUserInfo
  ): Promise<IResponse<UserBookingHistoryResponseDTO[]>> {
    try {
      const historyBooking = await this.bookingService.getBookingListByCondition({
        where: {
          user: {
            user_id: user.user_id,
          },
        },
        relations: {
          history: {
            seat: true,
          },
          movie: true,
          showtime: true,
        },
      });

      const historyBookingDTO = plainToClass(UserBookingHistoryResponseDTO, historyBooking, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<UserBookingHistoryResponseDTO[]> = {
        statusCode: 200,
        error: null,
        message: 'Lấy lịch sử đặt vé thành công.',
        data: historyBookingDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy lịch sử đặt vé thất bại.',
        error: error.message,
      });
    }
  }

  async getDetailBookingHistory(
    user: IJWTUserInfo,
    history_id: string
  ): Promise<IResponse<DetailBookingHistoryResponseDTO>> {
    try {
      const historyBooking = await this.bookingService.getBookingByCondition({
        where: {
          user: {
            user_id: user.user_id,
          },
          booking_id: history_id,
        },
        relations: {
          history: {
            seat: true,
          },
          movie: true,
          showtime: true,
          screen: {
            cinema: true,
          },
        },
      });

      if (!historyBooking) {
        throw new Error('Vé không tồn tại.');
      }

      const historyBookingDTO = plainToClass(DetailBookingHistoryResponseDTO, historyBooking, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<DetailBookingHistoryResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy chi tiết đặt vé thành công.',
        data: historyBookingDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy chi tiết đặt vé thất bại.',
        error: error.message,
      });
    }
  }

  async uploadPhoto(
    user: IJWTUserInfo,
    file: Multer.File,
    type: string
  ): Promise<IResponse<UserPhotoResponseDTO>> {
    try {
      const userInfo = await this.userService.getUserByID(user.user_id);

      if (!userInfo) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'upload photo thất bại.',
          error: 'USER NOT FOUND',
        });
      }

      const fileSaveCloud = await this.cloudinaryService.uploadFile(file);

      const userPhoto = new UserPhoto();

      userPhoto.image_url = fileSaveCloud.secure_url;
      userPhoto.photo_type = type as UserPhotoType;
      userPhoto.user = userInfo;

      const userPhotoNew = await this.userService.createUserPhoto(userPhoto);

      const userPhotoDTO = plainToClass(UserPhotoResponseDTO, userPhotoNew, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<UserPhotoResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Upload photo thành công.',
        data: userPhotoDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Upload photo thất bại.',
        error: error.message,
      });
    }
  }

  async getAllPhoto(user: IJWTUserInfo, type: string): Promise<IResponse<UserPhotoResponseDTO[]>> {
    try {
      let condition: IObject<any> = {};

      if (type === 'avatar' || type === 'cover') {
        condition = {
          photo_type: type,
        };
      }

      const photoList = await this.userService.getUserPhotos(user.user_id, condition);

      const photoListDTO = plainToClass(UserPhotoResponseDTO, photoList, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<UserPhotoResponseDTO[]> = {
        statusCode: 200,
        error: null,
        message: 'Lấy photo thành công.',
        data: photoListDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy photo thất bại.',
        error: error.message,
      });
    }
  }

  async updatePhoto(user: IJWTUserInfo, data: UserUpdatePhotoDTO): Promise<IResponse<string>> {
    try {
      const userFind = await this.userService.getUserByID(user.user_id);

      if (!userFind) {
        throw new Error('user not found');
      }

      switch (data.photo_type) {
        case 'avatar':
          userFind.image_url = data.image_url;
          await this.userService.updateUser(user.user_id, userFind);
          break;
        case 'cover':
          userFind.cover_image_url = data.image_url;
          await this.userService.updateUser(user.user_id, userFind);
          break;

        default:
          break;
      }

      const userDetailDTO = plainToClass(UserClientResponseDTO, userFind, {
        excludeExtraneousValues: true,
      });

      const keyCache = `${REDIS_USER_CLIENT_INFO_KEY}_${user.user_id}`;
      this.redisService.setDataRedis(keyCache, userDetailDTO, REDIS_USER_CLIENT_INFO_TTL);

      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật photo thành công.',
        data: 'UPDATE SUCCESS',
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật photo thất bại.',
        error: error.message,
      });
    }
  }
}
