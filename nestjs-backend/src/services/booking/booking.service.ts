import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingHistory } from 'src/core/entities/booking-history.entity';
import { Booking } from 'src/core/entities/booking.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingHistory)
    private readonly bookingHistoryRepository: Repository<BookingHistory>
  ) {}

  async getBookingByCondition(conditions: IObject<any>): Promise<Booking> {
    return await this.bookingRepository.findOne(conditions);
  }

  async getBookingListByCondition(conditions: IObject<any>): Promise<Booking[]> {
    return await this.bookingRepository.find(conditions);
  }

  async createBooking(bookingData: Booking): Promise<Booking> {
    return await this.bookingRepository.save(bookingData);
  }

  async updateBooking(bookingData: Booking): Promise<Booking> {
    return await this.bookingRepository.save(bookingData);
  }

  async createBookingHistory(bookingHistoryData: BookingHistory): Promise<BookingHistory> {
    return await this.bookingHistoryRepository.save(bookingHistoryData);
  }
}
