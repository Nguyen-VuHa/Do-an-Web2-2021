import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from 'src/core/entities/showtime.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>
  ) {}

  async getPaginationShowtimeByCondition(conditions: IObject<any>): Promise<[Showtime[], number]> {
    return await this.showtimeRepository.findAndCount(conditions);
  }

  async getShowtimeByCondition(conditions: IObject<any>): Promise<Showtime> {
    return await this.showtimeRepository.findOne(conditions);
  }

  async createShowtime(showtimeData: Showtime): Promise<Showtime> {
    return await this.showtimeRepository.save(showtimeData);
  }

  async updateShowtime(showtimeData: Showtime): Promise<Showtime> {
    return await this.showtimeRepository.save(showtimeData);
  }

  async softDeleteShowtime(showtime_id: string): Promise<any> {
    const showtime = await this.showtimeRepository.findOne({
      where: { showtime_id },
    });

    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }

    return await this.showtimeRepository.softRemove(showtime);
  }

  async unSoftDeleteShowtime(showtime_id: string): Promise<any> {
    const showtime = await this.showtimeRepository.findOne({
      where: { showtime_id },
      withDeleted: true,
    });

    if (!showtime) {
      throw new NotFoundException('Screen not found');
    }

    return await this.showtimeRepository.update(showtime_id, {
      deleted_at: null, // Khôi phục lại bản ghi
    });
  }
}
