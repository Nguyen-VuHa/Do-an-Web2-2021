import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateSeatDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  seat_id: number;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(8, { message: 'Tên ghế không được dài quá 8 ký tự' })
  seat_name: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  x: number;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  y: number;

  @IsOptional() // Yêu cầu trường này không được để trống
  @IsNumber()
  status: number; // 0 ẩn, 1 hiện
}

export class SeatResponseDTO {
  @Expose()
  seat_id: number;

  @Expose()
  seat_name: string;

  @Expose()
  x: number;

  @Expose()
  y: number;

  @Expose()
  seat_type: string;

  @Expose()
  price_modifier: number;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? 0 : 1))
  status: number;
}
