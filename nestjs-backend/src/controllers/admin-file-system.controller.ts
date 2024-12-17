import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import {
  FileSystemResponseDTO,
  GetFileSystemQueryDto,
  RenameFileSystemDTO,
  UploadFileSystemDTO,
} from 'src/core/dtos/admin-file-system.dto';
import { IResponse } from 'src/core/types/common';
import { AdminFileSystemUseCases } from 'src/use-cases/(admin)/file-system/file-system.usecase';

@Controller('admin/file-system')
export class AdminFileSystemController {
  constructor(private readonly adminFileSystemUseCase: AdminFileSystemUseCases) {}

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
  async getFileSystem(
    @Query() query: GetFileSystemQueryDto
  ): Promise<IResponse<FileSystemResponseDTO[]>> {
    return this.adminFileSystemUseCase.getFileSystemByParentID(query);
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
  ): Promise<IResponse<FileSystemResponseDTO>> {
    return this.adminFileSystemUseCase.saveFileSystem(file, data);
  }

  @Put('rename/:id')
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
    @Body() data: RenameFileSystemDTO
  ): Promise<IResponse<FileSystemResponseDTO>> {
    data.file_id = id;
    return this.adminFileSystemUseCase.renameFileSystem(data);
  }
}
