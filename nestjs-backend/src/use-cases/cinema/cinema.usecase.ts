import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  REDIS_CINEMA_CLIENT_DETAIL_KEY,
  REDIS_CINEMA_CLIENT_DETAIL_TTL,
  REDIS_CINEMA_CLIENT_KEY,
  REDIS_CINEMA_CLIENT_TTL,
} from 'src/constants/redis';
import { CinemaClientResponseDTO, CinemaDetailClientResponseDTO } from 'src/core/dtos/cinema.dto';
import { IObject, IResponse } from 'src/core/types/common';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { RedisService } from 'src/services/redis/redis.service';
import { ScreenService } from 'src/services/screen/screen.service';

@Injectable()
export class CinemaUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly cinemaService: CinemaService,
    private readonly screenService: ScreenService
  ) {}

  async getCinema(): Promise<IResponse<CinemaClientResponseDTO[]>> {
    try {
      const dataCache: IObject<any>[] =
        await this.redisService.getDataRedis(REDIS_CINEMA_CLIENT_KEY);

      const response: IResponse<CinemaClientResponseDTO[]> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách rạp chiếu phim thành công.',
      };

      if (dataCache) {
        response.data = dataCache as CinemaClientResponseDTO[];

        return response;
      }

      const cinemas = await this.cinemaService.getCinemaClient();

      const cinemasDTO = plainToClass(CinemaClientResponseDTO, cinemas, {
        excludeExtraneousValues: true,
      });

      response.data = cinemasDTO;

      // set data lên redis cache
      this.redisService.setDataRedis(REDIS_CINEMA_CLIENT_KEY, cinemasDTO, REDIS_CINEMA_CLIENT_TTL);

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách rạp chiếu phim thất bại.',
        error: error.message,
      });
    }
  }

  async getCinemaClientBySlug(slug: string): Promise<IResponse<CinemaDetailClientResponseDTO>> {
    try {
      const response: IResponse<CinemaDetailClientResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy chi tiết rạp phim thành công.',
      };

      const dataCache: IObject<any> = await this.redisService.getDataRedis(
        `${REDIS_CINEMA_CLIENT_DETAIL_KEY}_${slug}`
      );

      if (dataCache) {
        response.data = dataCache as CinemaDetailClientResponseDTO;

        return response;
      }

      const cinemaData = await this.cinemaService.getCinemaClientBySlug(slug);

      if (!cinemaData) {
        throw new Error('Rạp chiếu không tồn tại');
      }

      const cinemaDTO = plainToClass(CinemaDetailClientResponseDTO, cinemaData, {
        excludeExtraneousValues: true,
      });

      const screenType = await this.screenService.getScreenTypeByCinemaID(cinemaData.cinema_id);

      cinemaDTO.screen_type = screenType.join(', ');

      response.data = cinemaDTO;

      // set data lên redis cache
      this.redisService.setDataRedis(
        `${REDIS_CINEMA_CLIENT_DETAIL_KEY}_${slug}`,
        cinemaDTO,
        REDIS_CINEMA_CLIENT_DETAIL_TTL
      );

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy chi tiết rạp chiếu phim thất bại.',
        error: error.message,
      });
    }
  }
}
