import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ActorResponseDTO, CreateActorDTO } from 'src/core/dtos/admin-movie-detail';
import { IResponse } from 'src/core/types/common';
import { AdminMovieMetaUseCases } from 'src/use-cases/(admin)/movie-meta/admin-movie-meta.usecase';

@Controller('admin/actor')
export class AdminActorController {
  constructor(private readonly adminMovieMetaUseCase: AdminMovieMetaUseCases) {}

  @Get('list')
  async getAllActors(): Promise<IResponse<ActorResponseDTO>> {
    return this.adminMovieMetaUseCase.getAllActors();
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
  async createActor(@Body() data: CreateActorDTO): Promise<IResponse<ActorResponseDTO>> {
    return this.adminMovieMetaUseCase.createActor(data);
  }

  @Delete('delete')
  async deleteActor(@Query('_actor_id') actor_id: string): Promise<IResponse<ActorResponseDTO>> {
    return this.adminMovieMetaUseCase.deleteActor(actor_id);
  }
}
