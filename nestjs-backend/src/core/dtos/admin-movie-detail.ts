import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(80, { message: 'Tên thể loại không được dài quá 80 ký tự' }) // Đảm bảo mật khẩu không quá 20 ký tự
  category_name: string;
}
