import { Expose, Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { SortType } from '../types/common';
import { maskPhoneNumber } from 'src/utils/format';
import { UserGender } from '../entities/user.entity';
import * as dayjs from 'dayjs';

export class UserQueryDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  _page: number = 1; // default is 1

  @IsOptional()
  @IsInt()
  @Min(1)
  _page_size: number = 10; // default is 10

  @IsOptional()
  @IsString()
  _search: string; // search by fullname user

  @IsOptional()
  @IsString()
  _sort: string;

  @IsOptional()
  @IsEnum(SortType, { message: `The sorting type only supports two options: 'DESC' or 'ASC'.` })
  _sort_type: SortType;
}

export class UserResponseDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => {
    // Mã hóa email hoặc che email (ví dụ che tất cả ký tự trước dấu '@')
    const [username, domain] = value.split('@');

    const visiblePart = username.slice(0, 4); // Giữ lại 2 ký tự đầu
    const maskedPart = '*'.repeat(username.length - 4); // Ẩn phần còn lại

    return `${visiblePart}${maskedPart}@${domain}`;
  })
  email: string;

  @Expose()
  created_at: string;
}

export class UserClientResponseDTO {
  @Expose()
  user_id: string;

  @Expose()
  @Transform(({ value }) => {
    // Mã hóa email hoặc che email (ví dụ che tất cả ký tự trước dấu '@')
    const [username, domain] = value.split('@');

    const visiblePart = username.slice(0, 4); // Giữ lại 2 ký tự đầu
    const maskedPart = '*'.repeat(username.length - 4); // Ẩn phần còn lại

    return `${visiblePart}${maskedPart}@${domain}`;
  })
  email: string;

  @Expose()
  fullname;

  @Expose()
  @Transform(({ value }) => {
    return dayjs(value).format('YYYY-MM-DD');
  })
  birth_day;

  @Expose()
  @Transform(({ value }) => {
    return maskPhoneNumber(value);
  })
  phone_number;

  @Expose()
  @Transform(({ value }) => {
    return value === 'male' ? 'Nam' : 'Nữ';
  })
  gender;

  @Expose()
  image_url;

  @Expose()
  cover_image_url;

  @Expose()
  balance;

  @Expose()
  notify_unread: number;
}

export class UserEditDTO {
  @IsNotEmpty() // Yêu cầu trường không được để trống
  @MaxLength(100, { message: 'Tên đầy đủ không được dài quá 100 ký tự' }) // Giới hạn độ dài tối đa là 100 ký tự
  fullname: string;

  @IsNotEmpty() // Yêu cầu trường không được để trống
  @IsISO8601()
  birth_day: string;

  @IsNotEmpty() // Yêu cầu trường không được để trống
  @IsEnum(UserGender, { message: 'Giới tính không hợp lệ.' })
  gender: string;
}

export class UserBookingHistoryResponseDTO {
  @Expose()
  booking_id: string;

  @Expose()
  total_amount: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.history.length || 0;
  })
  total_seat: number;

  @Expose()
  created_at: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.showtime.start_time;
  })
  showtime: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.movie.title;
  })
  movie_name: string;
}
