import { Module } from '@nestjs/common';
import { CloudinaryServiceModule } from 'src/services/cloudinary/cloudinary.module';
import { FileSystemServiceModule } from 'src/services/file-system/file-system.module';
import { AdminFileSystemUseCases } from './file-system.usecase';

@Module({
  imports: [FileSystemServiceModule, CloudinaryServiceModule],
  providers: [AdminFileSystemUseCases],
  exports: [AdminFileSystemUseCases],
})
export class AdminFileSystemUseCaseModule {}
