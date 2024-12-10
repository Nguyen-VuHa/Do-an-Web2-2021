import { Controller, Get } from '@nestjs/common';
import { IResponse } from 'src/core/types/common';
import { AdminMovieMetaUseCases } from 'src/use-cases/(admin)/movie-meta/admin-movie-meta.usecase';

@Controller('admin/director')
export class AdminDirectorController {
  constructor(private readonly adminMovieMetaUseCase: AdminMovieMetaUseCases) {}

  @Get('list')
  async getAllDirector(): Promise<IResponse<any>> {
    return this.adminMovieMetaUseCase.getAllDirectors();
  }
}
