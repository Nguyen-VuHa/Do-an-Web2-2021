import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ACTIVE, INACTIVE } from 'src/constants/status';
import {
  CreateScreenDTO,
  GetScreenQueryDto,
  ScreenResponseDTO,
  UpdateScreenDTO,
  UpdateStatusScreenDTO,
} from 'src/core/dtos/admin-screen.dto';
import { Screen, ScreenType } from 'src/core/entities/screen.entity';
import { IObject, IPagination, IResponse } from 'src/core/types/common';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { ScreenService } from 'src/services/screen/screen.service';
import { ILike } from 'typeorm';

@Injectable()
export class AdminScreenUseCases {
  constructor(
    private readonly screenService: ScreenService,
    private readonly cinemaService: CinemaService
  ) {}

  async getScreenList(
    objQuery: GetScreenQueryDto
  ): Promise<IResponse<IPagination<ScreenResponseDTO>>> {
    try {
      let condition: IObject<any> = {};

      if (objQuery._search) {
        condition = {
          ...condition,
          screen_name: ILike(`%${objQuery._search}%`),
        };
      }

      const screenQuery: IObject<any> = {
        where: condition,
        relations: {
          cinema: true,
        },
        take: objQuery._page_size,
        skip: (objQuery._page - 1) * objQuery._page_size,
        order: {
          created_at: 'DESC',
        },
        withDeleted: true,
      };
      const [cinemaList, totalRows] =
        await this.screenService.getPaginationScreenByCondition(screenQuery);

      const screenDTO = plainToClass(ScreenResponseDTO, cinemaList, {
        excludeExtraneousValues: true,
      });

      const dataPagination: IPagination<ScreenResponseDTO> = {
        limit: objQuery._page_size,
        page: objQuery._page,
        total: totalRows,
        list: screenDTO,
      };

      const response: IResponse<IPagination<ScreenResponseDTO>> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách phòng chiếu thành công.',
        data: dataPagination,
      };
      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách phòng chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async getScreenType(): Promise<IResponse<string[]>> {
    try {
      const typeList = Object.values(ScreenType);

      const response: IResponse<string[]> = {
        statusCode: 200,
        error: null,
        message: 'Lấy loại phòng chiếu thành công.',
        data: typeList,
      };
      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy loại phòng chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async createScreen(data: CreateScreenDTO): Promise<IResponse<ScreenResponseDTO>> {
    try {
      const cinema = await this.cinemaService.getCinemaByID(data.cinema);

      if (!cinema) {
        throw new Error('Rạp chiếu không tồn tại.');
      }

      const screen = new Screen();

      screen.screen_name = data.screen_name;
      screen.screen_type = data.screen_type;
      screen.cinema = cinema;

      const screenNew = await this.screenService.createScreen(screen);

      const screenDTO = plainToClass(ScreenResponseDTO, screenNew, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<ScreenResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Tạo mới phòng chiếu thành công',
        data: screenDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Tạo mới phòng chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async updateScreen(data: UpdateScreenDTO): Promise<IResponse<ScreenResponseDTO>> {
    try {
      const cinema = await this.cinemaService.getCinemaByID(data.cinema);

      if (!cinema) {
        throw new Error('Rạp chiếu không tồn tại.');
      }

      const screen = await this.screenService.getCinemaByIDWithDeleted(data.screen_id);

      if (!screen) {
        throw new Error('Phòng chiếu không tồn tại.');
      }

      screen.screen_name = data.screen_name;
      screen.screen_type = data.screen_type;
      screen.cinema = cinema;

      const screenUpdate = await this.screenService.updateScreen(screen);

      const screenDTO = plainToClass(ScreenResponseDTO, screenUpdate, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<ScreenResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật phòng chiếu thành công',
        data: screenDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật phòng chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async updateStatusScreen(data: UpdateStatusScreenDTO): Promise<IResponse<string>> {
    try {
      switch (data._status) {
        case ACTIVE:
          await this.screenService.unSoftDeleteScreen(data._screen_id);
          break;
        case INACTIVE:
          await this.screenService.softDeleteScreen(data._screen_id);
          break;
        default:
          break;
      }
      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật thành công trạng thái phòng chiếu.',
        data: `Đã cập nhật thành trạng thái '${data._status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}' thành công.`,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật trạng thái phòng chiếu không thành công.',
        error: error.message,
      });
    }
  }
}
