import { Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class GetCinemasQueryDto {
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

export class CreateCinemaDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(240, { message: 'Tên rạp chiếu không được dài quá 240 ký tự' })
  cinema_name: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(140, { message: 'Slug không được dài quá 140 ký tự' })
  slug: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(240, { message: 'Tên địa chỉ rạp chiếu không được dài quá 240 ký tự' })
  address: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(40, { message: 'Tên khu vực không được dài quá 40 ký tự' })
  area: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsUrl()
  embed_map_url: string;
}

export class UpdateCinemaDTO extends CreateCinemaDTO {}

export class CinemaResponseDTO {
  @Expose()
  cinema_id: number;

  @Expose()
  cinema_name: string;

  @Expose()
  slug: string;

  @Expose()
  address: string;

  @Expose()
  area: string;

  @Expose()
  embed_map_url: string;

  @Expose()
  created_at: string;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? 'inactive' : 'active'))
  status: string;
}
