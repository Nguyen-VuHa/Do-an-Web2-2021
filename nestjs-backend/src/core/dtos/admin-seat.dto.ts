import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

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
}
