import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileSystem } from 'src/core/entities/file-system.entity';
import { IObject } from 'src/core/types/common';
import { IsNull, Repository } from 'typeorm';

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

  async getFileSystemByRoot(): Promise<FileSystem> {
    return await this.fileSystemRepository.findOne({
      where: {
        parent: {
          file_system_id: IsNull(),
        },
      },
    });
  }

  async getFileSystemListByParentID(parent_id: string): Promise<FileSystem[]> {
    return await this.fileSystemRepository.find({
      where: {
        parent: {
          file_system_id: parent_id,
        },
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getBreadcrumb(fileSystemId: string): Promise<IObject<any>[]> {
    const breadcrumb: { id: string; name: string }[] = [];
    let currentNode = await this.fileSystemRepository.findOne({
      where: { file_system_id: fileSystemId },
      relations: ['parent'], // Lấy parent để truy ngược
    });

    // Lặp qua các cấp cha cho đến khi gặp root (parent === null)
    while (currentNode) {
      breadcrumb.push({
        id: currentNode.file_system_id,
        name: currentNode.name,
      });

      // Lấy thông tin của parent trong mỗi vòng lặp
      if (currentNode.parent) {
        currentNode = await this.fileSystemRepository.findOne({
          where: { file_system_id: currentNode.parent.file_system_id },
          relations: ['parent'], // Lấy parent của parent
        });
      } else {
        break; // Nếu không có parent (đến root), thoát khỏi vòng lặp
      }
    }

    // Đảm bảo breadcrumb được sắp xếp từ root đến node cuối cùng
    return breadcrumb.reverse();
  }

  async saveFileSystem(fileSystemData: FileSystem): Promise<FileSystem> {
    return await this.fileSystemRepository.save(fileSystemData);
  }

  async updateFileSystem(fileSystemData: FileSystem): Promise<FileSystem> {
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
