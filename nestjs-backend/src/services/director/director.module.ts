import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from 'src/core/entities/director.entity';
import { DirectorService } from './director.service';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: [DirectorService],
  exports: [DirectorService],
})
export class DirectorServiceModule {}
