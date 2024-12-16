import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystem } from 'src/core/entities/file-system.entity';
import { FileSystemService } from './file-system.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileSystem])],
  providers: [FileSystemService],
  exports: [FileSystemService],
})
export class FileSystemServiceModule {}
