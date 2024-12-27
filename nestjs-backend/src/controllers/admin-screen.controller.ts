import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MAX_PAGE_SIZE, PAGE_IDX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/constants/default';
import {
  CreateScreenDTO,
  GetScreenQueryDto,
  ScreenResponseDTO,
  UpdateScreenDTO,
  UpdateStatusScreenDTO,
} from 'src/core/dtos/admin-screen.dto';
import { IPagination, IResponse } from 'src/core/types/common';
import { AdminScreenUseCases } from 'src/use-cases/(admin)/screen/screen.usecase';

@Controller('admin/screen')
export class AdminScreenController {
  constructor(private readonly adminScreenUseCase: AdminScreenUseCases) {}

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
  async getScreens(
    @Query() query: GetScreenQueryDto
  ): Promise<IResponse<IPagination<ScreenResponseDTO>>> {
    const { _page, _page_size } = query;

    let pageSize = PAGE_SIZE_DEFAULT;

    if (_page_size) {
      pageSize = _page_size > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : _page_size;
    }

    const queryClean: GetScreenQueryDto = {
      ...query,
      _page: _page || PAGE_IDX_DEFAULT,
      _page_size: pageSize,
    };

    return this.adminScreenUseCase.getScreenList(queryClean);
  }

  @Get('type')
  async getScreenType(): Promise<IResponse<string[]>> {
    return this.adminScreenUseCase.getScreenType();
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
  async createScreen(@Body() data: CreateScreenDTO): Promise<IResponse<ScreenResponseDTO>> {
    return this.adminScreenUseCase.createScreen(data);
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
  async updateScreen(@Body() data: UpdateScreenDTO): Promise<IResponse<ScreenResponseDTO>> {
    return this.adminScreenUseCase.updateScreen(data);
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
  async updateStatusScreen(@Query() data: UpdateStatusScreenDTO): Promise<IResponse<string>> {
    return this.adminScreenUseCase.updateStatusScreen(data);
  }
}
