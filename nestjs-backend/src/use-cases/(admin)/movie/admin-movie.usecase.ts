import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ACTIVE, INACTIVE } from 'src/constants/status';
import {
  CreateMovieDTO,
  DetailMovieResponseDTO,
  GetMoviesQueryDto,
  MovieResponseDTO,
  UpdateMovieDTO,
  UpdateStatusMovieDTO,
} from 'src/core/dtos/admin-movie';
import { Movie } from 'src/core/entities/movie.entity';
import { IObject, IPagination, IResponse } from 'src/core/types/common';
import { ActorService } from 'src/services/actor/actor.service';
import { CategoryService } from 'src/services/category/category.service';
import { DirectorService } from 'src/services/director/director.service';
import { MovieService } from 'src/services/movie/movie.service';
import { Between } from 'typeorm';

@Injectable()
export class AdminMovieUseCases {
  constructor(
    private readonly movieService: MovieService,
    private readonly directorService: DirectorService,
    private readonly actorService: ActorService,
    private readonly categoryService: CategoryService
  ) {}

  async getMovieList(
    objQuery: GetMoviesQueryDto
  ): Promise<IResponse<IPagination<MovieResponseDTO>>> {
    try {
      let whereCondition: IObject<any> = {};

      if (objQuery._start_date && objQuery._end_date) {
        // Chuyển đổi từ string sang Date
        const startDate = new Date(objQuery._start_date);
        startDate.setHours(0, 0, 0, 0); // Đặt thời gian là 00:00:00

        const endDate = new Date(objQuery._end_date);
        endDate.setHours(23, 59, 59, 999); // Đặt thời gian là 23:59:59

        whereCondition = {
          ...whereCondition,
          created_at: Between(startDate, endDate),
        };
      }

      const movieQuery: IObject<any> = {
        where: whereCondition,
        take: objQuery._page_size,
        skip: (objQuery._page - 1) * objQuery._page_size,
        order: {
          created_at: 'DESC',
        },
        withDeleted: true,
      };

      const [movies, totalCount] =
        await this.movieService.getPaginationMovieByCondition(movieQuery);

      const movieListDTO = plainToClass(MovieResponseDTO, movies, {
        excludeExtraneousValues: true,
      });

      const movieResponse: IPagination<MovieResponseDTO> = {
        page: objQuery._page,
        limit: objQuery._page_size,
        total: totalCount,
        list: movieListDTO,
      };

      const response: IResponse<IPagination<MovieResponseDTO>> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách phim thành công.',
        data: movieResponse,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách phim không thành công.',
        error: error.message,
      });
    }
  }

  async getDetailMovie(_movie_id: string): Promise<IResponse<DetailMovieResponseDTO>> {
    try {
      const conditionDetail: IObject<any> = {
        relations: {
          categories: true,
          actors: true,
          director: true,
        },
        where: {
          movie_id: _movie_id,
        },
        withDeleted: true,
      };

      const movieDetail = await this.movieService.getDetailMovieByCondition(conditionDetail);

      const movieDetailDTO = plainToClass(DetailMovieResponseDTO, movieDetail, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<DetailMovieResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy chi tiết phim thành công.',
        data: movieDetailDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy chi tiết phim không thành công.',
        error: error.message,
      });
    }
  }

  async createMovie(data: CreateMovieDTO): Promise<IResponse<MovieResponseDTO>> {
    try {
      const director = await this.directorService.getDirectorByID(data.director);

      if (!director) {
        throw new NotFoundException('Director not found');
      }

      const actors = await this.actorService.getActorListByIds(data.actors);

      if (actors.length !== data.actors.length) {
        throw new NotFoundException('Actors một hoặc nhiều ID không tồn tại');
      }

      const categories = await this.categoryService.getCategoriesListByIds(data.categories);

      if (categories.length !== data.categories.length) {
        throw new NotFoundException('Categories một hoặc nhiều ID không tồn tại');
      }

      const movieCreate = new Movie();

      movieCreate.title = data.title;
      movieCreate.description = data.description;
      movieCreate.duration = data.duration;
      movieCreate.start_date = data.start_date;
      movieCreate.end_date = data.end_date;
      movieCreate.trailer_id = data.trailer_id;
      movieCreate.director = director;
      movieCreate.actors = actors;
      movieCreate.categories = categories;
      movieCreate.posters = [];

      const movieResponse = await this.movieService.createMovie(movieCreate);

      const movieDTO = plainToClass(MovieResponseDTO, movieResponse, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<MovieResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Tạo mới phim thành công.',
        data: movieDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Tạo mới phim không thành công.',
        error: error.message,
      });
    }
  }

  async updateMovie(data: UpdateMovieDTO): Promise<IResponse<MovieResponseDTO>> {
    try {
      const director = await this.directorService.getDirectorByID(data.director);

      if (!director) {
        throw new NotFoundException('Director not found');
      }

      const actors = await this.actorService.getActorListByIds(data.actors);

      if (actors.length !== data.actors.length) {
        throw new NotFoundException('Actors một hoặc nhiều ID không tồn tại');
      }

      const categories = await this.categoryService.getCategoriesListByIds(data.categories);

      if (categories.length !== data.categories.length) {
        throw new NotFoundException('Categories một hoặc nhiều ID không tồn tại');
      }

      const movieUpdate = await this.movieService.getMovieDetailForUpdate(data.movie_id);

      if (!movieUpdate) {
        throw new NotFoundException('Movie not found');
      }

      movieUpdate.title = data.title;
      movieUpdate.description = data.description;
      movieUpdate.duration = data.duration;
      movieUpdate.start_date = data.start_date;
      movieUpdate.end_date = data.end_date;
      movieUpdate.trailer_id = data.trailer_id;
      movieUpdate.director = director;
      movieUpdate.actors = actors;
      movieUpdate.categories = categories;
      movieUpdate.posters = [];

      const movieResonse = await this.movieService.updateMovie(movieUpdate);

      const movieDTO = plainToClass(MovieResponseDTO, movieResonse, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<MovieResponseDTO> = {
        statusCode: 200,
        error: null,
        message: `Cập nhật phim thành công.`,
        data: movieDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật phim không thành công.',
        error: error.message,
      });
    }
  }

  async updateStatusMovie(data: UpdateStatusMovieDTO): Promise<IResponse<string>> {
    try {
      switch (data._status) {
        case ACTIVE:
          await this.movieService.unSoftDeleteMovie(data._movie_id);
          break;
        case INACTIVE:
          await this.movieService.softDeleteMovie(data._movie_id);
          break;
        default:
          break;
      }

      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật thành công trạng thái phim.',
        data: `Đã cập nhật thành trạng thái '${data._status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}' thành công.`,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật trạng thái phim thất bại.',
        error: error.message,
      });
    }
  }
}
