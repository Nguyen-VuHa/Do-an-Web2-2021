import { Expose, Transform } from 'class-transformer';
import { getRandomArray } from 'src/utils/random';

export class MovieTopWeekResponseDTO {
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
  description: string;

  @Expose()
  trailer_id: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.director.director_name;
  })
  director: string;

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
  @Transform(({ obj }) => {
    return obj.actors.map((actor) => actor.actor_name).join(', ');
  })
  actors: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.categories.map((categoty) => categoty.category_name).join(', ');
  })
  categories: string;
}

export class MovieClientResponseDTO {
  showing: MovieTopWeekResponseDTO[];
  comming_soon: MovieTopWeekResponseDTO[];
}
