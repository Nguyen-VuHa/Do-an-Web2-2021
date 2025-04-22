import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class BookingSeat {
  @IsNotEmpty()
  @IsNumber()
  seat_id: number;

  @IsNotEmpty()
  @IsString()
  seat_name: string;
}

export class BookingSeatResponseDTO {
  @Expose()
  seat_id: number;

  @Expose()
  seat_name: string;
}

export class BookingTicketDTO {
  @IsOptional()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  showtime_id: string;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsNotEmpty()
  @IsUUID()
  movie_id: string;

  @IsNotEmpty()
  @IsNumber()
  screen_id: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BookingSeat)
  seats: BookingSeat[];
}
