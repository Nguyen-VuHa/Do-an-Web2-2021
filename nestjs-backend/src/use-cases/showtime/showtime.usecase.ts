import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { REDIS_SHOWTIME_BY_CINEMA_KEY, REDIS_SHOWTIME_BY_CINEMA_TTL } from 'src/constants/redis';
import { ShowtimeByCinemaResponseDTO } from 'src/core/dtos/showtime.dto';
import { IObject, IResponse } from 'src/core/types/common';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { MovieService } from 'src/services/movie/movie.service';
import { RedisService } from 'src/services/redis/redis.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';

@Injectable()
export class ShowtimeUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly movieService: MovieService,
    private readonly cinemaService: CinemaService,
    private readonly showtimeService: ShowtimeService
  ) {}

  async getShowtimeByCinema(slug: string): Promise<IResponse<ShowtimeByCinemaResponseDTO[]>> {
    try {
      const cinema = await this.cinemaService.getCinemaBySlug(slug);

      if (!cinema) {
        throw new Error('Không tồn tại rạp chiếu phim này.');
      }

      const keyCache = `${REDIS_SHOWTIME_BY_CINEMA_KEY}_${slug}`;
      const dataCache: IObject<any>[] = await this.redisService.getDataRedis(keyCache);

      const response: IResponse<ShowtimeByCinemaResponseDTO[]> = {
        statusCode: 200,
        error: null,
        message: 'Lấy thông tin suất chiếu thành công.',
      };

      if (dataCache) {
        response.data = dataCache as ShowtimeByCinemaResponseDTO[];

        return response;
      }

      const showtimeByCinema = await this.movieService.getMovieClientListByCondition({
        where: {
          showtimes: {
            screen: {
              cinema: {
                slug: slug,
              },
            },
          },
        },
        relations: {
          showtimes: {
            screen: {
              cinema: true,
            },
          },
          posters: true,
        },
      });

      const showtimeDTO = plainToClass(ShowtimeByCinemaResponseDTO, showtimeByCinema, {
        excludeExtraneousValues: true,
      });

      response.data = showtimeDTO;

      // set data lên redis cache
      this.redisService.setDataRedis(keyCache, showtimeDTO, REDIS_SHOWTIME_BY_CINEMA_TTL);

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy thông tin suất chiếu thất bại.',
        error: error.message,
      });
    }
  }
}
