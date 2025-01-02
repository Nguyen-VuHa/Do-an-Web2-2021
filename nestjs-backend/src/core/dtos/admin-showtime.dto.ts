import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ACTIVE, INACTIVE } from 'src/constants/status';
import { IEnumStatus } from '../types/common';
import { ScreenResponseDTO } from './admin-screen.dto';
import { MovieResponseDTO } from './admin-movie';
import { CinemaResponseDTO } from './admin-cinema.dto';

export class GetShowtimeQueryDto {
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
  @Type(() => CinemaResponseDTO)
  @Transform(({ obj }) => {
    return obj.screen.cinema;
  })
  cinema: CinemaResponseDTO;

  @Expose()
  @Type(() => ScreenResponseDTO)
  @Transform(({ obj }) => {
    delete obj.screen.cinema;
    return obj.screen;
  })
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

export class SmartCreateShowtimeDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(240, { message: 'Tên phim không được dài quá 240 ký tự' })
  movie: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsArray({ message: 'Danh sách suất chiếu phải là một mảng hợp lệ' })
  @ArrayNotEmpty({ message: 'Danh sách suất chiếu không được để trống' })
  @ValidateNested({ each: true }) // Kiểm tra từng phần tử trong mảng
  @Type(() => ShowtimeItemData)
  showtimes: ShowtimeItemData[];
}

class ShowtimeItemData {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(240, { message: 'Tên rạp chiếu không được dài quá 240 ký tự' })
  cinema: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsArray({ message: 'Thời gian chiếu phải là một mảng string' })
  @IsString({ each: true, message: 'Mỗi tên Thời gian chiếu trong danh sách phải là một chuỗi' })
  times: string[];
}
