import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  REDIS_SHOWTIME_BY_CINEMA_KEY,
  REDIS_SHOWTIME_BY_CINEMA_TTL,
  REDIS_SHOWTIME_BY_MOVIE_KEY,
  REDIS_SHOWTIME_BY_MOVIE_TTL,
} from 'src/constants/redis';
import {
  ShowtimeByCinemaResponseDTO,
  ShowtimeByMovieItemResponseDTO,
  ShowtimeByMovieResponseDTO,
} from 'src/core/dtos/showtime.dto';
import { IObject, IResponse } from 'src/core/types/common';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { MovieService } from 'src/services/movie/movie.service';
import { RedisService } from 'src/services/redis/redis.service';

@Injectable()
export class ShowtimeUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly movieService: MovieService,
    private readonly cinemaService: CinemaService
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

  async getShowtimeByMovie(movie_id: string): Promise<IResponse<ShowtimeByMovieResponseDTO>> {
    try {
      const keyCache = `${REDIS_SHOWTIME_BY_MOVIE_KEY}_${movie_id}`;

      const response: IResponse<ShowtimeByMovieResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy thông tin suất chiếu thành công.',
      };

      const dataCache: IObject<any> = await this.redisService.getDataRedis(keyCache);

      if (dataCache) {
        response.data = dataCache as ShowtimeByMovieResponseDTO;

        return response;
      }

      const showtimeByMovie = await this.cinemaService.getCinemaListClientByCondition({
        where: {
          screens: {
            showtimes: {
              movie: {
                movie_id: movie_id,
              },
            },
          },
        },
        relations: {
          banners: true,
          screens: {
            showtimes: {
              movie: true,
            },
          },
        },
      });

      const showtimeByMovieDTO = plainToClass(ShowtimeByMovieItemResponseDTO, showtimeByMovie, {
        excludeExtraneousValues: true,
      });

      const areas = Array.from(new Set(showtimeByMovieDTO.map((item) => item.area)));

      const showtimeResponse: ShowtimeByMovieResponseDTO = {
        areas: areas,
        showtimes: showtimeByMovieDTO,
      };

      response.data = showtimeResponse;

      // set data lên redis cache
      this.redisService.setDataRedis(keyCache, showtimeResponse, REDIS_SHOWTIME_BY_MOVIE_TTL);

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
