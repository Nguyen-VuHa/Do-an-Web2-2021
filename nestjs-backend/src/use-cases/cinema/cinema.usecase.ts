import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { REDIS_CINEMA_CLIENT_KEY, REDIS_CINEMA_CLIENT_TTL } from 'src/constants/redis';
import { CinemaClientResponseDTO } from 'src/core/dtos/cinema.dto';
import { IObject, IResponse } from 'src/core/types/common';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { RedisService } from 'src/services/redis/redis.service';

@Injectable()
export class CinemaUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly cinemaService: CinemaService
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

  async getCinemaClientBySlug(slug: string): Promise<string> {
    try {
      return 'toi usecase roi nek' + slug;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy chi tiết rạp chiếu phim thất bại.',
        error: error.message,
      });
    }
  }
}
