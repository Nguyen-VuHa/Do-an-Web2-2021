import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileSystem } from 'src/core/entities/file-system.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileSystemService {
  constructor(
    @InjectRepository(FileSystem)
    private fileSystemRepository: Repository<FileSystem>
  ) {}

  async getFileSystemByID(file_system_id: string): Promise<FileSystem> {
    return await this.fileSystemRepository.findOne({
      where: {
        file_system_id: file_system_id,
      },
    });
  }

  async saveFileSystem(fileSystemData: FileSystem): Promise<FileSystem> {
    return await this.fileSystemRepository.save(fileSystemData);
  }

  // Kiểm tra và tạo tên duy nhất
  async generateUniqueName(name: string): Promise<string> {
    let uniqueName = name;
    let counter = 1;

    // Kiểm tra tên đã tồn tại hay chưa
    while (await this.isNameTaken(uniqueName)) {
      uniqueName = `(${counter}) ${name}`; // Thêm số thứ tự vào tên
      counter++;
    }

    return uniqueName;
  }

  // Kiểm tra tên đã tồn tại trong cơ sở dữ liệu
  private async isNameTaken(name: string): Promise<boolean> {
    const image = await this.fileSystemRepository.findOne({ where: { name } });
    return image ? true : false;
  }
}
