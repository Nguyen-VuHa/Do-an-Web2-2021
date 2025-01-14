import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { SortType } from '../types/common';
import { maskPhoneNumber } from 'src/utils/format';

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
  birth_day;

  @Expose()
  @Transform(({ value }) => {
    return maskPhoneNumber(value);
  })
  phone_number;

  @Expose()
  gender;

  @Expose()
  image_url;

  @Expose()
  cover_image_url;

  @Expose()
  balance;
}
