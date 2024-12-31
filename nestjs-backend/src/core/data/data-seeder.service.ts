// src/custom.service.ts
import { Injectable } from '@nestjs/common';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { ScreenService } from 'src/services/screen/screen.service';
import { Screen } from '../entities/screen.entity';
import { ScreenData } from './screen.data';
import { Seat } from '../entities/seat.entity';
import SeatData from './seat.data';

@Injectable()
export class DataSeederService {
  constructor(
    private readonly cinemaService: CinemaService,
    private readonly screenService: ScreenService
  ) {}

  async createScreenSeeder() {
    try {
      const cinemaList = await this.cinemaService.getCinemaSelection();

      if (!cinemaList) {
        throw new Error('Vui lòng tạo dữ liệu rạp phim trước.');
      }

      for (const cinema of cinemaList) {
        let index = 0;
        for (const scrData of ScreenData) {
          const screenData = new Screen();

          screenData.screen_name = scrData.screen_name;
          screenData.screen_type = scrData.screen_type;
          screenData.cinema = cinema;

          const seatAction: Seat[] = [];
          SeatData[index].seats.map((seat) => {
            const seatNew = new Seat();

            seatNew.seat_name = seat.seat_name;
            seatNew.x = seat.x;
            seatNew.y = seat.y;

            seatAction.push(seatNew);
          });

          screenData.seats = seatAction;

          await this.screenService.createScreen(screenData);
          index++;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
