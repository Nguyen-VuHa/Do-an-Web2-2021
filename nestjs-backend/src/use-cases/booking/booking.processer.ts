import { Processor, WorkerHost } from '@nestjs/bullmq';
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Job } from 'bullmq';
import { BOOKING_FAILED, BOOKING_QUEUE, BOOKING_SUCCESS } from 'src/constants/queue';
import { BookingTicketDTO } from 'src/core/dtos/booking.dto';
import { BookingHistory } from 'src/core/entities/booking-history.entity';
import { Booking } from 'src/core/entities/booking.entity';
import { BookingService } from 'src/services/booking/booking.service';
import { MovieService } from 'src/services/movie/movie.service';
import { ScreenService } from 'src/services/screen/screen.service';
import { SeatService } from 'src/services/seat/seat.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { StatusService } from 'src/services/status/status.service';
import { UserService } from 'src/services/user/user.service';
import { In } from 'typeorm';

@Processor('booking') // Queue chung cho tất cả request
export class BookingProcessor extends WorkerHost implements OnModuleInit {
  private userService: UserService;
  private bookingService: BookingService;
  private showtimeService: ShowtimeService;
  private screenService: ScreenService;
  private movieService: MovieService;
  private seatService: SeatService;
  private statusService: StatusService;

  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  // Inject MailService khi module được khởi tạo
  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
    this.bookingService = this.moduleRef.get(BookingService, { strict: false });
    this.showtimeService = this.moduleRef.get(ShowtimeService, { strict: false });
    this.screenService = this.moduleRef.get(ScreenService, { strict: false });
    this.movieService = this.moduleRef.get(MovieService, { strict: false });
    this.seatService = this.moduleRef.get(SeatService, { strict: false });
    this.statusService = this.moduleRef.get(StatusService, { strict: false });
  }

  async process(job: Job) {
    switch (job.name) {
      case BOOKING_QUEUE:
        console.log(`Processing booking job: ${job.id}`);
        // Sử dụng MailService để gửi email
        await this.handleBooking(job);
      default:
        throw new Error('No job name match');
    }
  }

  async handleBooking(job: Job) {
    const jobData = job.data.booking_detail;

    const keySSE = `${jobData.user_id}-${jobData.showtime_id}-${jobData.token}`;
    try {
      console.log(`Đang xử lý đơn hàng: ${job.id}`);
      const resSave = await this.saveBooking(job.data.booking_detail);
      console.log(`Xử lý xong đơn hàng: ${job.id}`);

      this.statusService.sendStatus(keySSE, {
        status: resSave,
        message:
          resSave === BOOKING_FAILED
            ? 'Tiến trình đặt vé thất bại!'
            : 'Tiến trình đặt vé thành công!',
      });
      await job.isCompleted();
    } catch (error) {
      console.log(error.message);
      // handle push message error to user.
      this.statusService.sendStatus(keySSE, {
        status: BOOKING_FAILED,
        message: 'Tiến trình đặt vé thất bại!',
      });
      await job.isFailed();
      return error;
    }
  }

  private async saveBooking(data_booking: BookingTicketDTO): Promise<string> {
    try {
      const user = await this.userService.getUserByID(data_booking.user_id);

      if (!user) {
        throw new Error("User doesn't exists.");
      }

      const showtime = await this.showtimeService.getShowtimeByCondition({
        where: {
          showtime_id: data_booking.showtime_id,
        },
      });

      if (!showtime) {
        throw new Error("Showtime doesn't exists.");
      }

      const screen = await this.screenService.getScreenById(data_booking.screen_id);

      if (!screen) {
        throw new Error("Screen doesn't exists.");
      }

      const movie = await this.movieService.getMovieByID(data_booking.movie_id);

      if (!movie) {
        throw new Error("Movie doesn't exists.");
      }

      const seat_ids = data_booking.seats.map((seat) => seat.seat_id);
      const seats = await this.seatService.getSeatListByIds(seat_ids);

      if (seats.length !== seat_ids.length) {
        throw new Error("Has some seat doesn't exists.");
      }

      // // check ghế chọn đã tồn tại chưa
      const check_seat = await this.bookingService.getBookingByCondition({
        where: {
          movie: {
            movie_id: data_booking.movie_id,
          },
          screen: {
            screen_id: data_booking.screen_id,
          },
          showtime: {
            showtime_id: data_booking.showtime_id,
          },
          history: {
            seat: {
              seat_id: In(seat_ids),
            },
          },
        },
      });

      if (check_seat) {
        throw new Error('Has some seat already booked.');
      }

      const total_amount = showtime.unit_price * seat_ids.length;

      const bookingNew = new Booking();

      bookingNew.movie = movie;
      bookingNew.screen = screen;
      bookingNew.showtime = showtime;
      bookingNew.user = user;
      bookingNew.unit_price = showtime.unit_price;
      bookingNew.total_amount = total_amount;

      const bookingRes = await this.bookingService.createBooking(bookingNew);

      for (const seat of seats) {
        const bookingHistory = new BookingHistory();

        bookingHistory.seat = seat;
        bookingHistory.booking = bookingRes;
        bookingHistory.seat_price = showtime.unit_price;

        await this.bookingService.createBookingHistory(bookingHistory);
      }
      return BOOKING_SUCCESS;
    } catch (error) {
      console.log(error.message);
      return BOOKING_FAILED;
    }
  }
}
