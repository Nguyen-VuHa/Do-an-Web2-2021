import { Expose } from 'class-transformer';

export class CinemaClientResponseDTO {
  @Expose()
  cinema_id: number;

  @Expose()
  slug: string;

  @Expose()
  cinema_name: string;

  @Expose()
  address: string;

  @Expose()
  area: string;
}
