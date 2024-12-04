import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cinema } from '../entities/cinema.entity';

const cinemaDataSeeder = [
  {
    name: 'CGV Hùng Vương Plaza',
    location: 'Tầng 7 | Hùng Vương Plaza, 126 Hồng Bàng, Phường 12, Quận 5, TP. Hồ Chí Minh.',
  },
  {
    name: 'CGV Gigamall Thủ Đức',
    location: 'Tầng 6 TTTM GIGAMALL, 240-242 Phạm Văn Đồng, P. Hiệp Bình Chánh, Q. Thủ Đức, TPHCM.',
  },
  {
    name: 'CGV Vincom Center Landmark 81',
    location:
      'Tầng B1 , TTTM Vincom Center Landmark 81, 772 Điện Biên Phủ, P.22, Q. Bình Thạnh, HCM',
  },
  {
    name: 'CGV Vinh Centre',
    location:
      'Tầng 4 – TTTM Vinh Center, 69 Hồ Tùng Mậu, P. Trường Thi, TP. Vinh, Tỉnh Nghệ An, Việt Nam',
  },
];

@Injectable()
export class CinemaSeeder {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>
  ) {}

  async seed() {
    const cinemas: Cinema[] = [];

    cinemaDataSeeder.map((data: any) => {
      const cinema = new Cinema();

      cinema.name = data.name;
      cinema.location = data.location;
      // Lưu user vào mảng
      cinemas.push(cinema);
    });

    // Lưu tất cả user và booking vào database
    await this.cinemaRepository.save(cinemas);
  }
}
