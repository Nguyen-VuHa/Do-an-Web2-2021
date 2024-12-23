import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl, MaxLength } from 'class-validator';

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

export class CreateActorDTO {
  @IsNotEmpty() // Yêu cầu trường này không được để trống
  @MaxLength(80, { message: 'Tên thể loại không được dài quá 80 ký tự' }) // Đảm bảo mật khẩu không quá 20 ký tự
  actor_name: string;
}

export class ActorResponseDTO {
  @Expose()
  actor_id: number;

  @Expose()
  actor_name: string;

  @Expose()
  created_at: string;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? 'inactive' : 'active'))
  status: string;
}

export class PosterResponseDTO {
  @Expose()
  movie_poster_id: number;

  @Expose()
  poster_url: string;
}

export class PosterCreateDTO {
  @IsOptional() // Yêu cầu trường này không được để trống
  @IsNumber()
  movie_poster_id: number | null;

  @IsNotEmpty()
  @IsUrl()
  poster_url: string;
}
