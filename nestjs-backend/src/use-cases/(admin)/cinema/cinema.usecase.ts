import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  CinemaResponseDTO,
  CreateCinemaDTO,
  GetCinemasQueryDto,
  UpdateCinemaDTO,
} from 'src/core/dtos/admin-cinema.dto';
import { Cinema } from 'src/core/entities/cinema.entity';
import { IObject, IPagination, IResponse } from 'src/core/types/common';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { ILike } from 'typeorm';

@Injectable()
export class AdminCinemaUseCases {
  constructor(private readonly cinemaService: CinemaService) {}

  async getCinemaList(
    objQuery: GetCinemasQueryDto
  ): Promise<IResponse<IPagination<CinemaResponseDTO>>> {
    try {
      let condition: IObject<any> = {};

      if (objQuery._search) {
        condition = {
          ...condition,
          cinema_name: ILike(`%${objQuery._search}%`),
        };
      }

      const cinemaQuery: IObject<any> = {
        where: condition,
        take: objQuery._page_size,
        skip: (objQuery._page - 1) * objQuery._page_size,
        order: {
          created_at: 'DESC',
        },
        withDeleted: true,
      };

      const [cinemaList, totalRows] =
        await this.cinemaService.getPaginationCinemaByCondition(cinemaQuery);

      const cinemaDTO = plainToClass(CinemaResponseDTO, cinemaList, {
        excludeExtraneousValues: true,
      });

      const dataPagination: IPagination<any> = {
        page: objQuery._page,
        limit: objQuery._page_size,
        list: cinemaDTO,
        total: totalRows,
      };

      const response: IResponse<IPagination<any>> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách rạp chiếu thành công.',
        data: dataPagination,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách rạp chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async getCinemaSelection(): Promise<IResponse<IObject<any>[]>> {
    try {
      const cinemaSelect = await this.cinemaService.getCinemaSelection();

      const response: IResponse<IObject<any>[]> = {
        statusCode: 200,
        error: null,
        message: 'Lấy danh sách chọn rạp chiếu thành công.',
        data: cinemaSelect,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy danh sách chọn rạp chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async getCinemaDetailBySlug(slug: string): Promise<IResponse<CinemaResponseDTO>> {
    try {
      const cinemaData = await this.cinemaService.getCinemaBySlugWithDeteled(slug);

      if (!cinemaData) {
        throw new Error('Rạp chiếu phim không tồn tại');
      }

      const cinemaDTO = plainToClass(CinemaResponseDTO, cinemaData, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<CinemaResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Lấy thông tin rạp chiếu thành công',
        data: cinemaDTO,
      };
      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Lấy thông tin rạp chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async createCinema(data: CreateCinemaDTO): Promise<IResponse<CinemaResponseDTO>> {
    try {
      const cinemaNew = new Cinema();

      cinemaNew.cinema_name = data.cinema_name;
      cinemaNew.slug = data.slug;
      cinemaNew.address = data.address;
      cinemaNew.area = data.area;
      cinemaNew.embed_map_url = data.embed_map_url;

      const cinemaCreate = await this.cinemaService.createCinema(cinemaNew);

      const cinemaDTO = plainToClass(CinemaResponseDTO, cinemaCreate, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<CinemaResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Tạo mới rạp chiếu thành công.',
        data: cinemaDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Tạo mới rạp chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async updateCinema(slug: string, data: UpdateCinemaDTO): Promise<IResponse<CinemaResponseDTO>> {
    try {
      const cinemaBySlug = await this.cinemaService.getCinemaBySlug(slug);

      if (!cinemaBySlug) {
        throw new Error('Không tồn tại rạp chiếu');
      }
      cinemaBySlug.cinema_name = data.cinema_name;
      cinemaBySlug.slug = data.slug;
      cinemaBySlug.address = data.address;
      cinemaBySlug.area = data.area;
      cinemaBySlug.embed_map_url = data.embed_map_url;

      const cinemaUpdate = await this.cinemaService.updateCinema(cinemaBySlug);

      const cinemaDTO = plainToClass(CinemaResponseDTO, cinemaUpdate, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<CinemaResponseDTO> = {
        statusCode: 200,
        error: null,
        message: 'Cập nhật rạp phim thành công.',
        data: cinemaDTO,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Cập nhật rạp phim không thành công.',
        error: error.message,
      });
    }
  }

  async deleteCinema(slug: string): Promise<IResponse<string>> {
    try {
      await this.cinemaService.softDeleteCinema(slug);

      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Xoá rạp chiếu thành công.',
        data: 'Đã xoá rạp chiếu ' + slug,
      };
      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Xoá rạp chiếu không thành công.',
        error: error.message,
      });
    }
  }

  async undoDeleteCinema(slug: string): Promise<IResponse<string>> {
    try {
      await this.cinemaService.unSoftDeleteCinema(slug);

      const response: IResponse<string> = {
        statusCode: 200,
        error: null,
        message: 'Hoàn tác rạp chiếu thành công.',
        data: 'Đã hoàn tác rạp chiếu ' + slug,
      };
      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Hoàn tác rạp chiếu không thành công.',
        error: error.message,
      });
    }
  }
}
