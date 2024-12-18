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
import { IFileSystemReponse } from 'src/core/types/file-system.type';
import { IsNull } from 'typeorm';

@Injectable()
export class AdminFileSystemUseCases {
  constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async getFileSystemByParentID(
    query: GetFileSystemQueryDto
  ): Promise<IResponse<IFileSystemReponse>> {
    try {
      let parent_id = query._p_id;

      if (!parent_id) {
        const rootData = await this.fileSystemService.getFileSystemByRoot();

        parent_id = rootData.file_system_id;
      }

      const breadCrumb = await this.fileSystemService.getBreadcrumb(parent_id);
      const fileListData = await this.fileSystemService.getFileSystemListByParentID(parent_id);

      const fileListDTO = plainToClass(FileSystemResponseDTO, fileListData, {
        excludeExtraneousValues: true,
      });

      const fileSystemRes: IFileSystemReponse = {
        breadcrumb: breadCrumb,
        list: fileListDTO,
      };

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách file system thành công.',
        data: fileSystemRes,
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

  async deleteFileSystem(file_system_id: string): Promise<IResponse<string>> {
    try {
      const fileData = await this.fileSystemService.getFileSystemByID(file_system_id);

      if (!fileData) {
        throw new NotFoundException('Không tồn tại tệp tin hoặc thư mục.');
      }

      if (fileData.type === 'folder' && fileData.name === 'Root') {
        throw new NotFoundException('Thư mục root không phải để bạn xoá, nhớ nhé bớt vọc.');
      }

      const timestamp = Math.floor(Date.now() / 1000);
      const fileNameDelete = `${file_system_id}-${timestamp}`;

      // xử lý xoá folder
      if (fileData.type === 'folder') {
        await this.deleteFolderAndChildren(file_system_id);

        fileData.name = fileNameDelete;
        fileData.deleted_at = new Date();
        await this.fileSystemService.updateFileSystem(fileData);
      }

      if (fileData.type === 'file') {
        const uniqueName = await this.fileSystemService.generateUniqueName(fileNameDelete);

        fileData.name = uniqueName;
        fileData.deleted_at = new Date();
        await this.fileSystemService.updateFileSystem(fileData);
      }
      // xử lý xoá file

      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Xoá tệp hoặc thư mục thành công.',
        data: 'success',
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Xoá tệp hoặc thư mục không thành công.',
        error: error.message,
      });
    }
  }

  private async deleteFolderAndChildren(parentId: string) {
    // Tìm tất cả các file/folder con của folder này
    const children = await this.fileSystemService.getListFileSystemByCondition({
      where: {
        parent: {
          file_system_id: parentId,
        },
        deleted_at: IsNull(),
      },
    });

    for (const child of children) {
      const timestamp = Math.floor(Date.now() / 1000);
      const fileNameDelete = `${child.file_system_id}-${timestamp}`;

      // Đổi tên và đánh dấu là đã xóa
      child.name = fileNameDelete;
      child.deleted_at = new Date();

      // Lưu lại thông tin đã thay đổi
      await this.fileSystemService.updateFileSystem(child);

      // Nếu item là folder, gọi đệ quy để xóa tất cả con của nó
      if (child.type === 'folder') {
        await this.deleteFolderAndChildren(child.file_system_id); // Đệ quy
      }
    }
  }
}
