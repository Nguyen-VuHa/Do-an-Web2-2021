import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpAccountDTO {
  @IsEmail() // Kiểm tra email hợp lệ
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  email: string;

  @IsString() // Đảm bảo password là một chuỗi
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' }) // Đảm bảo mật khẩu có ít nhất 8 ký tự
  @MaxLength(20, { message: 'Password không được dài quá 20 ký tự' }) // Đảm bảo mật khẩu không quá 20 ký tự
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/, {
    message: 'Password phải bao gồm ít nhất một chữ cái và một số',
  }) // Kiểm tra mật khẩu có ít nhất một chữ cái và một chữ số
  @IsNotEmpty() // Yêu cầu trường password không được để trống
  password: string;

  @IsNotEmpty() // Yêu cầu trường không được để trống
  @MaxLength(100, { message: 'Tên đầy đủ không được dài quá 100 ký tự' }) // Giới hạn độ dài tối đa là 100 ký tự
  fullName: string;

  @IsNotEmpty() // Yêu cầu trường không được để trống
  @Matches(/^(\+84|0)(9|3|7|8|5)[0-9]{8}$/, {
    message: 'Số điện thoại không hợp lệ.',
  }) // Kiểm tra số điện thoại Việt Nam
  phoneNumber: string;

  @IsNotEmpty() // Yêu cầu trường không được để trống
  @IsISO8601()
  birthDate: string;
}

export class CreateUserResponseDto {
  @Expose()
  user_id: number;

  @Expose()
  fullname: string;

  @Expose()
  balance: number;

  @Expose()
  image_url: string;

  @Expose()
  cover_image_url: string;

  @Expose()
  created_at: string;
}

export class SignInAccountDTO {
  @IsEmail() // Kiểm tra email hợp lệ
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  email: string;

  @IsString() // Đảm bảo password là một chuỗi
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' }) // Đảm bảo mật khẩu có ít nhất 8 ký tự
  @MaxLength(20, { message: 'Password không được dài quá 20 ký tự' }) // Đảm bảo mật khẩu không quá 20 ký tự
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/, {
    message: 'Password phải bao gồm ít nhất một chữ cái và một số',
  }) // Kiểm tra mật khẩu có ít nhất một chữ cái và một chữ số
  @IsNotEmpty() // Yêu cầu trường password không được để trống
  password: string;
}
