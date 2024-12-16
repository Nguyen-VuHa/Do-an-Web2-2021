import { IsEnum, IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { FileSystemType } from '../types/file-system.type';

export class UploadFileSystemDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsUUID()
  parent_file_system_id: string;

  @IsNotEmpty() // Kiểm tra email hợp lệ
  @IsEnum(FileSystemType, { message: 'File system type must be one of folder, file' })
  type: string;

  @IsOptional() // Kiểm tra email hợp lệ
  @MaxLength(250, { message: 'Tên thư mục không được dài quá 250 ký tự' }) // Đảm bảo mật khẩu không quá 20 ký tự
  folder_name: string;
}
