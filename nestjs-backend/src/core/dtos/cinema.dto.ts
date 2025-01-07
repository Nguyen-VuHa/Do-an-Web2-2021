import { Expose, Transform } from 'class-transformer';

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

  @Expose()
  @Transform(({ obj }) => {
    return obj.banners.length > 0 ? obj.banners[0].banner_url : '';
  })
  banner_url: string;
}

export class CinemaDetailClientResponseDTO {
  @Expose()
  cinema_id: number;

  @Expose()
  slug: string;

  @Expose()
  address: string;

  @Expose()
  area: string;

  @Expose()
  embed_map_url: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.screens.length;
  })
  screens: number;

  @Expose()
  screen_type: string;
}
