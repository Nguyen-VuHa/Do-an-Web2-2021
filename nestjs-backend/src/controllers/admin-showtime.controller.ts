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
  CreateShowtimeDTO,
  GetShowtimeQueryDto,
  ShowtimeResponseDTO,
  UpdateShowtimeDTO,
  UpdateStatusShowtimeDTO,
} from 'src/core/dtos/admin-showtime.dto';
import { IPagination, IResponse } from 'src/core/types/common';
import { AdminShowtimeUseCases } from 'src/use-cases/(admin)/showtime/showtime.usecase';

@Controller('admin/showtime')
export class AdminShowtimeController {
  constructor(private readonly adminShowtimeUseCase: AdminShowtimeUseCases) {}

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
  async getShowtimes(
    @Query() query: GetShowtimeQueryDto
  ): Promise<IResponse<IPagination<ShowtimeResponseDTO>>> {
    const { _page, _page_size } = query;

    let pageSize = PAGE_SIZE_DEFAULT;

    if (_page_size) {
      pageSize = _page_size > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : _page_size;
    }

    const queryClean: GetShowtimeQueryDto = {
      ...query,
      _page: _page || PAGE_IDX_DEFAULT,
      _page_size: pageSize,
    };

    return this.adminShowtimeUseCase.getShowtimeList(queryClean);
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
  async createShowtime(@Body() data: CreateShowtimeDTO): Promise<IResponse<ShowtimeResponseDTO>> {
    return this.adminShowtimeUseCase.createShowtime(data);
  }

  @Put('update')
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
  async updateShowtime(@Body() data: UpdateShowtimeDTO): Promise<IResponse<ShowtimeResponseDTO>> {
    return this.adminShowtimeUseCase.updateShowtime(data);
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
  async updateStatusShowtime(@Query() data: UpdateStatusShowtimeDTO): Promise<IResponse<string>> {
    return this.adminShowtimeUseCase.updateStatusShowtime(data);
  }

  @Get('detail/:showtime_id')
  async getDetailShowtime(
    @Param('showtime_id') showtime_id: string
  ): Promise<IResponse<ShowtimeResponseDTO>> {
    return this.adminShowtimeUseCase.getDetailShowtime(showtime_id);
  }
}
