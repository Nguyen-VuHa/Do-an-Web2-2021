import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from 'src/core/entities/cinema.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>
  ) {}

  async getPaginationCinemaByCondition(conditions: IObject<any>): Promise<[Cinema[], number]> {
    return await this.cinemaRepository.findAndCount(conditions);
  }

  async getCinemaBySlug(slug: string): Promise<Cinema> {
    return await this.cinemaRepository.findOne({
      where: {
        slug: slug,
      },
      withDeleted: true,
    });
  }

  async createCinema(cinemaData: Cinema): Promise<Cinema> {
    return await this.cinemaRepository.save(cinemaData);
  }

  async updateCinema(cinemaData: Cinema): Promise<Cinema> {
    return await this.cinemaRepository.save(cinemaData);
  }

  async softDeleteCinema(slug: string): Promise<Cinema> {
    const cinema = await this.cinemaRepository.findOne({
      where: { slug },
    });

    if (!cinema) {
      throw new NotFoundException('Rạp chiếu không tồn tại.');
    }

    return await this.cinemaRepository.softRemove(cinema);
  }

  async unSoftDeleteCinema(slug: string): Promise<any> {
    const cinema = await this.cinemaRepository.findOne({
      where: { slug },
      withDeleted: true,
    });

    if (!cinema) {
      throw new NotFoundException('Rạp chiếu không tồn tại.');
    }

    return await this.cinemaRepository.update(cinema.cinema_id, {
      deleted_at: null, // Khôi phục lại bản ghi
    });
  }
}
