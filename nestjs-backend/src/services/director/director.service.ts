import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'src/core/entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>
  ) {}

  async getAllDirectors(): Promise<Director[]> {
    return await this.directorRepository.find({
      where: {
        deleted_at: null,
      },
    });
  }
}
