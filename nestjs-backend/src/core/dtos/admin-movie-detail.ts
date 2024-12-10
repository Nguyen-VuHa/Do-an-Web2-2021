import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(80, { message: 'Tên thể loại không được dài quá 80 ký tự' }) // Đảm bảo mật khẩu không quá 20 ký tự
  category_name: string;
}

export class CategoryResponseDTO {
  @Expose()
  category_id: number;

  @Expose()
  category_name: string;

  @Expose()
  created_at: string;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? 'inactive' : 'active'))
  status: string;
}

export class CreateDirectorDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(80, { message: 'Tên đạo diễn không được dài quá 80 ký tự' }) // Đảm bảo mật khẩu không quá 20 ký tự
  director_name: string;
}

export class DirectorResponseDTO {
  @Expose()
  director_id: number;

  @Expose()
  director_name: string;

  @Expose()
  created_at: string;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? 'inactive' : 'active'))
  status: string;
}
