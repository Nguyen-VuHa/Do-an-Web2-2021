import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'src/core/entities/director.entity';
import { IObject } from 'src/core/types/common';
import { IsNull, Repository } from 'typeorm';

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

  async getDirectorByWhere(conditions: IObject<any>): Promise<Director> {
    return await this.directorRepository.findOne({
      where: conditions,
      withDeleted: true,
    });
  }

  async createDirectror(directorData: Director): Promise<Director> {
    return await this.directorRepository.save(directorData);
  }

  async softDeleteDirector(director_id: number): Promise<any> {
    const category = await this.directorRepository.findOne({
      where: { director_id, deleted_at: IsNull() },
    });
    if (!category) {
      throw new Error(`Director with ID ${director_id} not found`);
    }
    return await this.directorRepository.softRemove(category);
  }

  async unSoftDeleteDirector(director_id: number): Promise<any> {
    return await this.directorRepository.update(director_id, {
      deleted_at: null, // Khôi phục lại bản ghi
    });
  }
}
