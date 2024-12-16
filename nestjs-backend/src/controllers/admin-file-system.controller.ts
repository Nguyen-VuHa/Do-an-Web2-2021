import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { UploadFileSystemDTO } from 'src/core/dtos/admin-file-system.dto';
import { IResponse } from 'src/core/types/common';
import { AdminFileSystemUseCases } from 'src/use-cases/(admin)/file-system/file-system.usecase';

@Controller('admin/file-system')
export class AdminFileSystemController {
  constructor(private readonly adminFileSystemUseCase: AdminFileSystemUseCases) {}

  @Get('list')
  async getFileSystem(): Promise<string> {
    return 'get list file ne';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
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
  async uploadFile(
    @UploadedFile() file: Multer.File,
    @Body() data: UploadFileSystemDTO
  ): Promise<IResponse<any>> {
    return this.adminFileSystemUseCase.saveFileSystem(file, data);
  }
}
