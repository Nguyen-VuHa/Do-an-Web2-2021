import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  REDIS_MOVIE_CLIENT_DETAIL_KEY,
  REDIS_MOVIE_CLIENT_DETAIL_TTL,
  REDIS_MOVIE_CLIENT_KEY,
  REDIS_MOVIE_CLIENT_TTL,
  REDIS_MOVIE_TOP_WEEK_KEY,
  REDIS_MOVIE_TOP_WEEK_TTL,
} from 'src/constants/redis';
import {
  MovieClientDetailResponseDTO,
  MovieClientResponseDTO,
  MovieTopWeekResponseDTO,
} from 'src/core/dtos/movie.dto';
import { IObject, IResponse } from 'src/core/types/common';
import { MovieService } from 'src/services/movie/movie.service';
import { RedisService } from 'src/services/redis/redis.service';
import { LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class MovieUseCases {
  constructor(
    private readonly redisService: RedisService,
    private readonly movieService: MovieService
  ) {}

  async getTopWeekMovie(): Promise<IResponse<MovieTopWeekResponseDTO>> {
    try {
      const data: IObject<any> = await this.redisService.getDataRedis(REDIS_MOVIE_TOP_WEEK_KEY);

      const response: IResponse<MovieTopWeekResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy phim top trong tuần thành công',
      };

      if (data) {
        response.data = data as MovieTopWeekResponseDTO;
        // nếu có thì trả về luôn
        return response;
      }

      const movieTopWeek = await this.movieService.getMovieTopWeek();

      const movieTopWeekDTO = plainToClass(MovieTopWeekResponseDTO, movieTopWeek, {
        excludeExtraneousValues: true,
      });

      response.data = movieTopWeekDTO;

      // set data lên redis cache
      this.redisService.setDataRedis(
        REDIS_MOVIE_TOP_WEEK_KEY,
        movieTopWeekDTO,
        REDIS_MOVIE_TOP_WEEK_TTL
      );

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy thông tin top phim trong tuần thất bại.',
        error: error.message,
      });
    }
  }

  async getMovie(): Promise<IResponse<MovieClientResponseDTO>> {
    try {
      const data: IObject<any> = await this.redisService.getDataRedis(REDIS_MOVIE_CLIENT_KEY);

      const response: IResponse<MovieClientResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy thông tin phim thành công.',
      };

      if (data) {
        response.data = data as MovieClientResponseDTO;

        return response;
      }

      const currentDate = new Date();

      const movieShowing = await this.movieService.getMovieClientByCondition({
        start_date: LessThanOrEqual(currentDate),
        end_date: MoreThanOrEqual(currentDate),
      });

      const movieComingSoon = await this.movieService.getMovieClientByCondition({
        start_date: MoreThan(currentDate),
        end_date: MoreThan(currentDate),
      });

      const movieShowingDTO = plainToClass(MovieTopWeekResponseDTO, movieShowing, {
        excludeExtraneousValues: true,
      });

      const movieComingSoonDTO = plainToClass(MovieTopWeekResponseDTO, movieComingSoon, {
        excludeExtraneousValues: true,
      });

      const movieData: MovieClientResponseDTO = {
        showing: movieShowingDTO,
        comming_soon: movieComingSoonDTO,
      };

      response.data = movieData;

      // set data lên redis cache
      this.redisService.setDataRedis(REDIS_MOVIE_CLIENT_KEY, movieData, REDIS_MOVIE_CLIENT_TTL);

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy thông tin phim thất bại.',
        error: error.message,
      });
    }
  }

  async getMovieDetail(movie_id: string): Promise<IResponse<MovieClientDetailResponseDTO>> {
    try {
      const keyCache = `${REDIS_MOVIE_CLIENT_DETAIL_KEY}_${movie_id}`;
      const dataCache: IObject<any> = await this.redisService.getDataRedis(keyCache);

      const response: IResponse<MovieClientDetailResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy thông tin chi tiết phim thành công.',
      };

      if (dataCache) {
        response.data = dataCache as MovieClientDetailResponseDTO;

        return response;
      }

      const movie = await this.movieService.getDetailMovieByCondition({
        where: {
          movie_id: movie_id,
        },
        relations: {
          posters: true,
          actors: true,
          director: true,
          categories: true,
        },
      });

      if (!movie) {
        throw new Error('Phim không tồn tại');
      }

      const movieDTO = plainToClass(MovieClientDetailResponseDTO, movie, {
        excludeExtraneousValues: true,
      });

      response.data = movieDTO;

      // set data lên redis cache
      this.redisService.setDataRedis(keyCache, movieDTO, REDIS_MOVIE_CLIENT_DETAIL_TTL);

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy thông tin chi tiết phim thất bại.',
        error: error.message,
      });
    }
  }
}
