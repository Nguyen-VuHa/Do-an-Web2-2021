import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

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
