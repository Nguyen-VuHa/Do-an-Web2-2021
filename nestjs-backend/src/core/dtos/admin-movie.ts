import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { MovieStatus } from '../types/movie.type';

export class GetMoviesQueryDto {
  @IsOptional()
  @Type(() => Number) // Chuyển đổi từ string sang number
  @IsNumber()
  _page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _page_size?: number;

  @IsOptional()
  @IsDateString()
  _start_date?: Date;

  @IsOptional()
  @IsDateString()
  @IsStartDateBeforeEndDate('_start_date', {
    message: 'Ngày khởi chiếu phải nhỏ hơn ngày kết thúc',
  })
  _end_date?: Date;
}

export class CreateMovieDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(240, { message: 'Tên phim không được dài quá 240 ký tự' })
  title: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  @Max(240, { message: 'Thời gian bộ phim không vượt quá 240 phút' })
  duration: number;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsDateString({}, { message: 'Phải là một ngày hợp lệ' })
  start_date: Date;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsDateString({}, { message: 'Phải là một ngày hợp lệ' })
  @IsStartDateBeforeEndDate('start_date', {
    message: 'Ngày khởi chiếu phải nhỏ hơn ngày kết thúc',
  })
  end_date: Date;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(30, { message: 'Trailer ID không được dài quá 30 ký tự' })
  trailer_id: string;

  @IsOptional()
  @MaxLength(1000, { message: 'Mô tả không được dài quá 1000 ký tự' })
  description: string;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsNumber()
  director: number;

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsArray({ message: 'actors phải là một mảng ID' })
  @ArrayNotEmpty({ message: 'Danh sách actors không được để trống' })
  @IsInt({ each: true, message: 'Mỗi ID trong actors phải là một số nguyên' })
  actors: number[];

  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @IsArray({ message: 'categories phải là một mảng ID' })
  @ArrayNotEmpty({ message: 'Danh sách categories không được để trống' })
  @IsInt({ each: true, message: 'Mỗi ID trong categories phải là một số nguyên' })
  categories: number[];
}

function IsStartDateBeforeEndDate(
  property: string, // Tên trường cần so sánh (endDate)
  validationOptions?: ValidationOptions // Tuỳ chọn thông báo lỗi
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isStartDateBeforeEndDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property], // Trường endDate
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName]; // Giá trị của endDate
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            new Date(value) > new Date(relatedValue) // Kiểm tra `startDate < endDate`
          );
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} phải nhỏ hơn ${relatedPropertyName}.`; // Tuỳ chỉnh thông báo lỗi
        },
      },
    });
  };
}

export class MovieResponseDTO {
  @Expose()
  movie_id: string;

  @Expose()
  title: string;

  @Expose()
  duration: number;

  @Expose()
  start_date: string;

  @Expose()
  end_date: string;

  @Expose()
  @Transform(({ obj }) => {
    const now = new Date();
    const startDate = new Date(obj.start_date);
    const endDate = new Date(obj.end_date);

    if (startDate <= now && endDate >= now) {
      return 'Đang chiếu';
    } else if (startDate > now) {
      return 'Sắp chiếu';
    } else {
      return 'Đã kết thúc';
    }
  })
  movie_type: string;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? 'inactive' : 'active'))
  status: string;
}

export class UpdateStatusMovieDTO {
  @IsNotEmpty()
  _movie_id: string;

  @IsNotEmpty()
  @IsEnum(MovieStatus, { message: 'Movie status must be one of active, inactive' })
  _status: string;
}
