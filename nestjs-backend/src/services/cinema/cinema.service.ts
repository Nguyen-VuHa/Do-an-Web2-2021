import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaBanner } from 'src/core/entities/cinema-banner.entity';
import { Cinema } from 'src/core/entities/cinema.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>,

    @InjectRepository(CinemaBanner)
    private readonly cinemaBannerRepository: Repository<CinemaBanner>
  ) {}

  async getPaginationCinemaByCondition(conditions: IObject<any>): Promise<[Cinema[], number]> {
    return await this.cinemaRepository.findAndCount(conditions);
  }

  async getCinemaSelection(): Promise<Cinema[]> {
    return await this.cinemaRepository.find({
      select: ['cinema_id', 'cinema_name'],
    });
  }

  async getCinemaDetailByCondition(conditions: IObject<any>): Promise<Cinema> {
    return await this.cinemaRepository.findOne(conditions);
  }

  async getCinemaClient(): Promise<Cinema[]> {
    return await this.cinemaRepository.find({
      relations: {
        banners: true,
      },
    });
  }

  async getCinemaByID(id: number): Promise<Cinema> {
    return await this.cinemaRepository.findOne({
      where: {
        cinema_id: id,
      },
    });
  }

  async getCinemaBySlug(slug: string): Promise<Cinema> {
    return await this.cinemaRepository.findOne({
      where: {
        slug: slug,
      },
    });
  }

  async getCinemaClientBySlug(slug: string): Promise<Cinema> {
    return await this.cinemaRepository.findOne({
      where: {
        slug: slug,
      },
      relations: {
        banners: true,
      },
    });
  }

  async getCinemaBySlugWithDeteled(slug: string): Promise<Cinema> {
    return await this.cinemaRepository.findOne({
      where: {
        slug: slug,
      },
      relations: {
        banners: true,
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

  async getCinemaBannerByID(id: number): Promise<CinemaBanner> {
    return await this.cinemaBannerRepository.findOne({
      where: {
        cinema_banner_id: id,
      },
    });
  }

  async createCinemaBanner(cinemaBannerData: CinemaBanner): Promise<CinemaBanner> {
    return await this.cinemaBannerRepository.save(cinemaBannerData);
  }

  async updateCinemaBanner(cinemaBannerData: CinemaBanner): Promise<CinemaBanner> {
    return await this.cinemaBannerRepository.save(cinemaBannerData);
  }
}
