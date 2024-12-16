import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { FileSystemService } from 'src/services/file-system/file-system.service';
import { Multer } from 'multer';
import { UploadFileSystemDTO } from 'src/core/dtos/admin-file-system.dto';
import { FileSystem } from 'src/core/entities/file-system.entity';
import { IResponse } from 'src/core/types/common';

@Injectable()
export class AdminFileSystemUseCases {
  constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async saveFileSystem(file: Multer.File, data: UploadFileSystemDTO): Promise<IResponse<any>> {
    try {
      const parentFileSystem = await this.fileSystemService.getFileSystemByID(
        data.parent_file_system_id
      );

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

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Xử lý lưu tệp tin hoặc thư mục thành công',
        data: newFileSystem,
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
