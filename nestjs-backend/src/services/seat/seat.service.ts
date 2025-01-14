import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from 'src/core/entities/seat.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>
  ) {}

  async getSeatListByIdsWithDeleted(ids: number[]): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: {
        seat_id: In(ids),
      },
      withDeleted: true,
    });
  }

  async getSeatListByIds(ids: number[]): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: {
        seat_id: In(ids),
      },
    });
  }

  async updateSeatScreenList(seatList: Seat[]): Promise<Seat[]> {
    return await this.seatRepository.save(seatList);
  }
}
