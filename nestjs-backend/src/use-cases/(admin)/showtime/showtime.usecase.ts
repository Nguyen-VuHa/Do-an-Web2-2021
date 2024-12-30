import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ACTIVE, INACTIVE } from 'src/constants/status';
import {
  CreateShowtimeDTO,
  GetShowtimeQueryDto,
  ShowtimeResponseDTO,
  UpdateShowtimeDTO,
  UpdateStatusShowtimeDTO,
} from 'src/core/dtos/admin-showtime.dto';
import { Showtime } from 'src/core/entities/showtime.entity';
import { IObject, IPagination, IResponse } from 'src/core/types/common';
import { MovieService } from 'src/services/movie/movie.service';
import { ScreenService } from 'src/services/screen/screen.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { getInitialsChar } from 'src/utils/string';
import { LessThan, MoreThan, Not } from 'typeorm';

@Injectable()
export class AdminShowtimeUseCases {
  constructor(
    private readonly showtimeService: ShowtimeService,
    private readonly movieService: MovieService,
    private readonly screenService: ScreenService
  ) {}

  async getShowtimeList(
    objQuery: GetShowtimeQueryDto
  ): Promise<IResponse<IPagination<ShowtimeResponseDTO>>> {
    try {
      //   let condition: IObject<any> = {};

      const showtimeQuery: IObject<any> = {
        // where: condition,
        // relations: {
        //   cinema: true,
        // },
        take: objQuery._page_size,
        skip: (objQuery._page - 1) * objQuery._page_size,
        order: {
          created_at: 'DESC',
        },
        withDeleted: true,
      };

      const [showtimeList, totalRows] =
        await this.showtimeService.getPaginationShowtimeByCondition(showtimeQuery);

      const showtimeDTO = plainToClass(ShowtimeResponseDTO, showtimeList, {
        excludeExtraneousValues: true,
      });

      const dataPagination: IPagination<ShowtimeResponseDTO> = {
        limit: objQuery._page_size,
        page: objQuery._page,
        total: totalRows,
        list: showtimeDTO,
      };

      const response: IResponse<IPagination<ShowtimeResponseDTO>> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách suất chiếu thành công.',
        data: dataPagination,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách suất chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async getDetailShowtime(showtime_id: string): Promise<IResponse<ShowtimeResponseDTO>> {
    try {
      const showtimeDetail = await this.showtimeService.getShowtimeByCondition({
        where: {
          showtime_id: showtime_id,
        },
        relations: {
          screen: true,
          movie: true,
        },
        withdDeleted: true,
      });

      if (!showtimeDetail) {
        throw new Error('Không tồn tại suất chiếu này');
      }

      const showtimeDTO = plainToClass(ShowtimeResponseDTO, showtimeDetail, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<ShowtimeResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy chi tiết suất chiếu thành công',
        data: showtimeDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy chi tiết suất chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async createShowtime(data: CreateShowtimeDTO): Promise<IResponse<ShowtimeResponseDTO>> {
    try {
      const screen = await this.screenService.getCinemaByIDJoinCinema(data.screen);

      if (!screen) {
        throw new Error('Không tồn tại phòng chiếu này.');
      }

      const movie = await this.movieService.getMovieByID(data.movie);

      if (!movie) {
        throw new Error('Không tồn tại phim này.');
      }

      const startTime = new Date(data.start_date);
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + movie.duration);

      const showtimeExists = await this.showtimeService.getShowtimeByCondition({
        where: {
          start_time: LessThan(endTime),
          end_time: MoreThan(startTime),
          screen: {
            screen_id: data.screen,
          },
        },
        relations: {
          screen: true,
        },
      });

      if (showtimeExists) {
        throw new Error('Khung giờ này đã tồn tại xuất chiếu');
      }
      const startUnixTime = Math.floor(startTime.getTime() / 1000);
      const prefixScreen = getInitialsChar(screen.screen_name);
      const prefixCinema = getInitialsChar(screen.cinema.cinema_name);
      const prefixMovie = getInitialsChar(movie.title);

      const showtimeID = `${prefixScreen}-${prefixCinema}-${prefixMovie}-${startUnixTime}`;

      const newShowtime = new Showtime();

      newShowtime.showtime_id = showtimeID;
      newShowtime.start_time = startTime;
      newShowtime.end_time = endTime;
      newShowtime.unit_price = data.unit_price;
      newShowtime.movie = movie;
      newShowtime.screen = screen;

      const showtimeCreated = await this.showtimeService.createShowtime(newShowtime);

      const showtimeDTO = plainToClass(ShowtimeResponseDTO, showtimeCreated, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<ShowtimeResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Tạo mới suất chiếu thành công.',
        data: showtimeDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Tạo mới suất chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async updateShowtime(data: UpdateShowtimeDTO): Promise<IResponse<ShowtimeResponseDTO>> {
    try {
      const screen = await this.screenService.getCinemaByIDJoinCinema(data.screen);

      if (!screen) {
        throw new Error('Không tồn tại phòng chiếu này.');
      }

      const movie = await this.movieService.getMovieByID(data.movie);

      if (!movie) {
        throw new Error('Không tồn tại phim này.');
      }

      const showtime = await this.showtimeService.getShowtimeByCondition({
        where: {
          showtime_id: data.showtime_id,
        },
      });

      if (!showtime) {
        throw new Error('Không tồn tại suất chiếu này.');
      }

      const startTime = new Date(data.start_date);
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + movie.duration);

      const showtimeExists = await this.showtimeService.getShowtimeByCondition({
        where: {
          showtime_id: Not(data.showtime_id),
          start_time: LessThan(endTime),
          end_time: MoreThan(startTime),
          screen: {
            screen_id: data.screen,
          },
        },
        relations: {
          screen: true,
        },
      });

      if (showtimeExists) {
        throw new Error('Khung giờ này đã tồn tại xuất chiếu');
      }

      showtime.start_time = startTime;
      showtime.end_time = endTime;
      showtime.unit_price = data.unit_price;
      showtime.movie = movie;
      showtime.screen = screen;

      const showtimeCreated = await this.showtimeService.updateShowtime(showtime);

      const showtimeDTO = plainToClass(ShowtimeResponseDTO, showtimeCreated, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<ShowtimeResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật suất chiếu thành công.',
        data: showtimeDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật suất chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async updateStatusShowtime(data: UpdateStatusShowtimeDTO): Promise<IResponse<string>> {
    try {
      switch (data._status) {
        case ACTIVE:
          await this.showtimeService.unSoftDeleteShowtime(data._showtime_id);
          break;
        case INACTIVE:
          await this.showtimeService.softDeleteShowtime(data._showtime_id);
          break;
        default:
          break;
      }
      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật thành công trạng thái suất chiếu.',
        data: `Đã cập nhật thành trạng thái '${data._status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}' thành công.`,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật trạng thái suất chiếu không thành công.',
        error: error.message,
      });
    }
  }
}
