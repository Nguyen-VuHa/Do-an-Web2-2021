import { Expose, Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ScreenType } from '../entities/screen.entity';
import { ACTIVE, INACTIVE } from 'src/constants/status';
import { IEnumStatus } from '../types/common';
import { CinemaResponseDTO } from './admin-cinema.dto';

export class GetScreenQueryDto {
  @IsOptional()
  @Type(() => Number) // Chuyển đổi từ string sang number
  @IsNumber()
  _page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _page_size?: number;

  @IsOptional()
  @Type(() => String) // Chuyển đổi từ string sang number
  @IsString()
  @MaxLength(50, { message: 'Chỉ được nhập tối đa 50 ký tự cho trường tìm kiếm' })
  _search?: string;
}

export class CreateScreenDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(240, { message: 'Tên phòng chiếu không được dài quá 240 ký tự' })
  screen_name: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsEnum(ScreenType, { message: 'Loại phòng chiếu không hợp lệ' })
  screen_type: ScreenType;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  cinema: number;
}

export class UpdateScreenDTO extends CreateScreenDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  screen_id: number;
}

export class ScreenResponseDTO {
  @Expose()
  screen_id: number;

  @Expose()
  screen_name: string;

  @Expose()
  screen_type: string;

  @Expose()
  created_at: string;

  @Expose()
  @Type(() => CinemaResponseDTO)
  cinema: CinemaResponseDTO;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? INACTIVE : ACTIVE))
  status: string;
}

export class UpdateStatusScreenDTO {
  @IsNotEmpty()
  _screen_id: number;

  @IsNotEmpty()
  @IsEnum(IEnumStatus, { message: 'Screen status must be one of active, inactive' })
  _status: string;
}
