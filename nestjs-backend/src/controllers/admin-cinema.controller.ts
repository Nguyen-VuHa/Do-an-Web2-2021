import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CinemaResponseDTO,
  CreateCinemaDTO,
  GetCinemasQueryDto,
  UpdateCinemaDTO,
} from 'src/core/dtos/admin-cinema.dto';
import { AdminCinemaUseCases } from 'src/use-cases/(admin)/cinema/cinema.usecase';
import { MAX_PAGE_SIZE, PAGE_IDX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/constants/default';
import { IPagination, IResponse } from 'src/core/types/common';

@Controller('admin/cinema')
export class AdminCinemaController {
  constructor(private readonly adminCinemaUseCase: AdminCinemaUseCases) {}

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
  async getCinemas(
    @Query() query: GetCinemasQueryDto
  ): Promise<IResponse<IPagination<CinemaResponseDTO>>> {
    const { _page, _page_size } = query;

    let pageSize = PAGE_SIZE_DEFAULT;

    if (_page_size) {
      pageSize = _page_size > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : _page_size;
    }

    const queryClean: GetCinemasQueryDto = {
      ...query,
      _page: _page || PAGE_IDX_DEFAULT,
      _page_size: pageSize,
    };

    return this.adminCinemaUseCase.getCinemaList(queryClean);
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
  async createCinema(@Body() data: CreateCinemaDTO): Promise<IResponse<CinemaResponseDTO>> {
    return this.adminCinemaUseCase.createCinema(data);
  }

  @Put('update/:slug')
  async updateCinema(
    @Param('slug') slug: string,
    @Body() data: UpdateCinemaDTO
  ): Promise<IResponse<CinemaResponseDTO>> {
    return this.adminCinemaUseCase.updateCinema(slug, data);
  }

  @Delete('delete/:slug')
  async deleteCinema(@Param('slug') slug: string): Promise<IResponse<string>> {
    return this.adminCinemaUseCase.deleteCinema(slug);
  }

  @Put('undo-delete/:slug')
  async undoDeleteCinema(@Param('slug') slug: string): Promise<IResponse<string>> {
    return this.adminCinemaUseCase.undoDeleteCinema(slug);
  }
}
