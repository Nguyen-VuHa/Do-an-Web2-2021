import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MAX_PAGE_SIZE, PAGE_IDX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/constants/default';
import {
  CreateMovieDTO,
  DetailMovieResponseDTO,
  GetMoviesQueryDto,
  MovieResponseDTO,
  SmartCreateMovieDTO,
  UpdateMovieDTO,
  UpdateStatusMovieDTO,
} from 'src/core/dtos/admin-movie';
import { IPagination, IResponse } from 'src/core/types/common';
import { AdminMovieUseCases } from 'src/use-cases/(admin)/movie/admin-movie.usecase';

@Controller('admin/movie')
export class AdminMovieController {
  constructor(private readonly adminMovieUseCase: AdminMovieUseCases) {}

  @Get('list')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async getMovies(
    @Query() query: GetMoviesQueryDto
  ): Promise<IResponse<IPagination<MovieResponseDTO>>> {
    const { _page, _page_size } = query;

    let pageSize = PAGE_SIZE_DEFAULT;

    if (_page_size) {
      pageSize = _page_size > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : _page_size;
    }

    const queryClean: GetMoviesQueryDto = {
      ...query,
      _page: _page || PAGE_IDX_DEFAULT,
      _page_size: pageSize,
    };

    return this.adminMovieUseCase.getMovieList(queryClean);
  }

  @Get('detail')
  async getDetailMovie(
    @Query('_movie_id') movie_id: string
  ): Promise<IResponse<DetailMovieResponseDTO>> {
    return this.adminMovieUseCase.getDetailMovie(movie_id);
  }

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async createMovie(@Body() data: CreateMovieDTO): Promise<IResponse<MovieResponseDTO>> {
    return this.adminMovieUseCase.createMovie(data);
  }

  @Put('update/:id')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async updateMovie(
    @Param('id') id: string,
    @Body() data: UpdateMovieDTO
  ): Promise<IResponse<MovieResponseDTO>> {
    data.movie_id = id;
    return this.adminMovieUseCase.updateMovie(data);
  }

  @Put('status')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async updateStatusMovie(@Query() data: UpdateStatusMovieDTO): Promise<IResponse<string>> {
    return this.adminMovieUseCase.updateStatusMovie(data);
  }

  @Post('extension/smart-create')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async smartCreateMovie(@Body() data: SmartCreateMovieDTO): Promise<IResponse<MovieResponseDTO>> {
    return this.adminMovieUseCase.smartCreateMovie(data);
  }

  @Get('extension/check-movie-name')
  async checkExistMovieName(@Query('_movie_name') movie_name: string): Promise<IResponse<boolean>> {
    if (!movie_name) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Params is required',
        error: 'Vui lòng truyền tên phim',
      });
    }
    return this.adminMovieUseCase.checkingMovieNameExists(movie_name);
  }
}
