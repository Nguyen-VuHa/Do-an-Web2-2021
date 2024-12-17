import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { FileSystemService } from 'src/services/file-system/file-system.service';
import { Multer } from 'multer';
import {
  FileSystemResponseDTO,
  GetFileSystemQueryDto,
  RenameFileSystemDTO,
  UploadFileSystemDTO,
} from 'src/core/dtos/admin-file-system.dto';
import { FileSystem } from 'src/core/entities/file-system.entity';
import { IResponse } from 'src/core/types/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AdminFileSystemUseCases {
  constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async getFileSystemByParentID(
    query: GetFileSystemQueryDto
  ): Promise<IResponse<FileSystemResponseDTO[]>> {
    try {
      let parent_id = query._p_id;

      if (!parent_id) {
        const rootData = await this.fileSystemService.getFileSystemByRoot();

        parent_id = rootData.file_system_id;
      }

      const fileListData = await this.fileSystemService.getFileSystemListByParentID(parent_id);

      const fileListDTO = plainToClass(FileSystemResponseDTO, fileListData, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách file system thành công.',
        data: fileListDTO,
      };
      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Xử lý tệp không thành công.',
        error: error.message,
      });
    }
  }

  async saveFileSystem(
    file: Multer.File,
    data: UploadFileSystemDTO
  ): Promise<IResponse<FileSystemResponseDTO>> {
    try {
      let parent_id = data.parent_file_system_id;

      if (!parent_id) {
        const rootData = await this.fileSystemService.getFileSystemByRoot();

        parent_id = rootData.file_system_id;
      }

      const parentFileSystem = await this.fileSystemService.getFileSystemByID(parent_id);

      if (!parentFileSystem) {
        throw new NotFoundException('Không tồn tại tệp tin hoặc thư mục.');
      }

      let newFileSystem: any;

      if (data.type === 'file') {
        const fileSaveCloud = await this.cloudinaryService.uploadFile(file);

        const uniqueName = await this.fileSystemService.generateUniqueName(file.originalname);
        // xử lý upload file
        const fileSystemData = new FileSystem();
        fileSystemData.name = uniqueName;
        fileSystemData.type = data.type;
        fileSystemData.size = file.size;
        fileSystemData.mime_type = file.mimetype;
        fileSystemData.path = fileSaveCloud.secure_url;
        fileSystemData.parent = parentFileSystem;

        newFileSystem = await this.fileSystemService.saveFileSystem(fileSystemData);
      }

      if (data.type === 'folder' && parentFileSystem.type !== 'file') {
        const folderName = data.folder_name || 'New Folder';
        const uniqueName = await this.fileSystemService.generateUniqueName(folderName);
        // xử lý upload file
        const fileSystemData = new FileSystem();
        fileSystemData.name = uniqueName;
        fileSystemData.type = data.type;
        fileSystemData.parent = parentFileSystem;

        newFileSystem = await this.fileSystemService.saveFileSystem(fileSystemData);
      }

      const fileDataDTO = plainToClass(FileSystemResponseDTO, newFileSystem, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Xử lý lưu tệp tin hoặc thư mục thành công',
        data: fileDataDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Xử lý tệp không thành công.',
        error: error.message,
      });
    }
  }

  async renameFileSystem(data: RenameFileSystemDTO): Promise<IResponse<FileSystemResponseDTO>> {
    try {
      const fileData = await this.fileSystemService.getFileSystemByID(data.file_id);

      if (!fileData) {
        throw new NotFoundException('Không tồn tại tệp tin hoặc thư mục.');
      }

      const uniqueName = await this.fileSystemService.generateUniqueName(data.file_name);

      fileData.name = uniqueName;

      const fileDataRes = await this.fileSystemService.updateFileSystem(fileData);

      const fileDataDTO = plainToClass(FileSystemResponseDTO, fileDataRes, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<FileSystemResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Thay đổi tên tệp hoặc thư mục thành công.',
        data: fileDataDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Xử lý tệp không thành công.',
        error: error.message,
      });
    }
  }
}
