import { BadRequestException, Injectable } from '@nestjs/common';
import { GetScreenQueryDto } from 'src/core/dtos/admin-screen.dto';
import { IObject, IPagination, IResponse } from 'src/core/types/common';
import { ScreenService } from 'src/services/screen/screen.service';
import { ILike } from 'typeorm';

@Injectable()
export class AdminScreenUseCases {
  constructor(private readonly screenService: ScreenService) {}

  async getScreenList(objQuery: GetScreenQueryDto): Promise<IResponse<IPagination<any>>> {
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
        take: objQuery._page_size,
        skip: (objQuery._page - 1) * objQuery._page_size,
        order: {
          created_at: 'DESC',
        },
        withDeleted: true,
      };
      const [cinemaList, totalRows] =
        await this.screenService.getPaginationScreenByCondition(screenQuery);

      const dataPagination: IPagination<any> = {
        limit: objQuery._page_size,
        page: objQuery._page,
        total: totalRows,
        list: cinemaList,
      };

      const response: IResponse<IPagination<any>> = {
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
}
