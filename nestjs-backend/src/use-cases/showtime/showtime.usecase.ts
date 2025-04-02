import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  REDIS_SHOWTIME_BY_CINEMA_KEY,
  REDIS_SHOWTIME_BY_CINEMA_TTL,
  REDIS_SHOWTIME_BY_MOVIE_KEY,
  REDIS_SHOWTIME_BY_MOVIE_TTL,
  REDIS_SHOWTIME_DETAIL_KEY,
  REDIS_SHOWTIME_DETAIL_TTL,
} from 'src/constants/redis';
import {
  ShowtimeByCinemaResponseDTO,
  ShowtimeByMovieItemResponseDTO,
  ShowtimeByMovieResponseDTO,
  ShowtimeDetailClientResponseDTO,
} from 'src/core/dtos/showtime.dto';
import { IObject, IResponse } from 'src/core/types/common';
import { BookingService } from 'src/services/booking/booking.service';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { MovieService } from 'src/services/movie/movie.service';
import { RedisService } from 'src/services/redis/redis.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { Between, IsNull } from 'typeorm';

@Injectable()
export class ShowtimeUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly movieService: MovieService,
    private readonly cinemaService: CinemaService,
    private readonly showtimeService: ShowtimeService,
    private readonly bookingService: BookingService
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

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // 00:00:00 hôm nay

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // 23:59:59 hôm nay

      const showtimeByCinema = await this.movieService.getMovieClientListByCondition({
        where: {
          showtimes: {
            start_time: Between(startOfDay, endOfDay),
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

      // const startOfDay = new Date();
      // startOfDay.setHours(0, 0, 0, 0); // 00:00:00 hôm nay

      // const endOfDay = new Date();
      // endOfDay.setHours(23, 59, 59, 999); // 23:59:59 hôm nay

      const showtimeByMovie = await this.cinemaService.getCinemaListClientByCondition({
        where: {
          screens: {
            showtimes: {
              // start_time: Between(startOfDay, endOfDay),
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

  async getShowtimeDetailByID(
    showtime_id: string
  ): Promise<IResponse<ShowtimeDetailClientResponseDTO>> {
    try {
      const keyCache = `${REDIS_SHOWTIME_DETAIL_KEY}_${showtime_id}`;

      const response: IResponse<ShowtimeDetailClientResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy chi tiết thông tin suất chiếu thành công',
      };

      const dataCache: IObject<any> = await this.redisService.getDataRedis(keyCache);

      if (dataCache) {
        response.data = dataCache as ShowtimeDetailClientResponseDTO;

        const seat_selected = await this.getSeatSelectedByShowtime(showtime_id);

        response.data.screen.seats = response.data.screen.seats.map((seat) => {
          const isSelected = seat_selected.includes(seat.seat_id);
          if (isSelected) {
            return {
              ...seat,
              status: 2,
            };
          } else {
            return seat;
          }
        });

        return response;
      }

      const showtimeDetail = await this.showtimeService.getShowtimeByCondition({
        where: {
          showtime_id: showtime_id,
          screen: {
            seats: {
              deleted_at: IsNull(),
            },
          },
        },
        relations: {
          movie: {
            posters: true,
          },
          screen: {
            seats: true,
          },
        },
      });

      if (!showtimeDetail) {
        throw new Error('Suất chiếu này không tồn tại.');
      }

      const showtimeDetailDTO = plainToClass(ShowtimeDetailClientResponseDTO, showtimeDetail, {
        excludeExtraneousValues: true,
      });

      // set data lên redis cache
      this.redisService.setDataRedis(keyCache, showtimeDetailDTO, REDIS_SHOWTIME_DETAIL_TTL);

      const seat_selected = await this.getSeatSelectedByShowtime(showtime_id);

      showtimeDetailDTO.screen.seats = showtimeDetailDTO.screen.seats.map((seat) => {
        const isSelected = seat_selected.includes(seat.seat_id);
        if (isSelected) {
          return {
            ...seat,
            status: 2,
          };
        } else {
          return seat;
        }
      });

      response.data = showtimeDetailDTO;

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy chi tiết thông tin suất chiếu thất bại.',
        error: error.message,
      });
    }
  }

  private async getSeatSelectedByShowtime(showtime_id: string): Promise<number[]> {
    try {
      const seats = await this.bookingService.getBookingListByCondition({
        where: {
          showtime: {
            showtime_id: showtime_id,
          },
        },
        relations: {
          history: {
            seat: true,
          },
        },
        select: {
          booking_id: true,
          history: {
            booking_history_id: true,
            seat: {
              seat_id: true,
            },
          },
        },
      });

      let seat_selected: number[] = [];

      seats.map((booking) => {
        seat_selected = seat_selected.concat(
          ...booking.history.map((history) => history.seat.seat_id)
        );
      });

      return seat_selected;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
