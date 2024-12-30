import { Expose, Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ACTIVE, INACTIVE } from 'src/constants/status';
import { IEnumStatus } from '../types/common';
import { ScreenResponseDTO } from './admin-screen.dto';
import { MovieResponseDTO } from './admin-movie';

export class GetShowtimeQueryDto {
  @IsOptional()
  @Type(() => Number) // Chuyển đổi từ string sang number
  @IsNumber()
  _page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _page_size?: number;
}

export class CreateShowtimeDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsDateString({}, { message: 'Phải là một ngày hợp lệ' })
  start_date: Date;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  unit_price: number;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  screen: number;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsUUID()
  movie: string;
}

export class UpdateShowtimeDTO extends CreateShowtimeDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsString()
  showtime_id: string;
}

export class ShowtimeResponseDTO {
  @Expose()
  showtime_id: string;

  @Expose()
  start_time: string;

  @Expose()
  end_time: string;

  @Expose()
  unit_price: number;

  @Expose()
  created_at: string;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? INACTIVE : ACTIVE))
  status: string;

  @Expose()
  @Type(() => ScreenResponseDTO)
  screen: ScreenResponseDTO;

  @Expose()
  @Type(() => MovieResponseDTO)
  movie: MovieResponseDTO;
}

export class UpdateStatusShowtimeDTO {
  @IsNotEmpty()
  _showtime_id: string;

  @IsNotEmpty()
  @IsEnum(IEnumStatus, { message: 'Screen status must be one of active, inactive' })
  _status: string;
}
