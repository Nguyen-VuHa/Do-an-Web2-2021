import { Expose, Transform, Type } from 'class-transformer';
import { getRandomArray } from 'src/utils/random';

export class ShowtimeByCinemaResponseDTO {
  @Expose()
  @Transform(({ obj }) => {
    return obj.title;
  })
  movie_name: string;

  @Expose()
  @Transform(({ obj }) => {
    const posters = obj?.posters;

    if (Array.isArray(posters)) {
      const posterRandom = getRandomArray(posters);

      // Kiểm tra posterRandom có phải là một đối tượng hợp lệ không
      if (posterRandom) {
        return posterRandom.poster_url;
      }
    }
    return ''; // Nếu không có poster_url hợp lệ, trả về chuỗi rỗng
  })
  poster: string;

  @Expose()
  @Type(() => ShowtimeResponseDTO)
  showtimes: ShowtimeResponseDTO[];
}

export class ShowtimeResponseDTO {
  @Expose()
  showtime_id: string;

  @Expose()
  start_time: string;
}
