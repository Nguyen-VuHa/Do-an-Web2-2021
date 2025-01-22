import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class GetNotifyQueryDto {
  @IsOptional()
  @Type(() => Number) // Chuyển đổi từ string sang number
  @IsNumber()
  _page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _page_size?: number;
}

export class CreateNotifyDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(1000, { message: 'Thông báo không được dài quá 1000 ký tự' })
  message: string;

  @IsOptional()
  @MaxLength(240, { message: 'Đường dẫn chuyển hướng trang quá dài' })
  redirect_url?: string;

  @IsOptional()
  @MaxLength(240, { message: 'Đường dẫn chuyển hướng trang quá dài' })
  image_url?: string;
}

export class NotifyResponseDTO {
  @Expose()
  notify_id: number;

  @Expose()
  message: string;

  @Expose()
  notify_type: string;

  @Expose()
  redirect_url: string;

  @Expose()
  image_url: string;

  @Expose()
  notify_status: string;

  @Expose()
  created_at: string;
}
