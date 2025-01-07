export interface ICinema {
  cinema_id: number;
  slug: string;
  cinema_name: string;
  address: string;
  area: string;
  banner_url: string;
}

export interface ICinemaDetail {
  cinema_id: number;
  slug: string;
  cinema_name: string;
  address: string;
  area: string;
  embed_map_url: string;
  screens: number;
  screen_type: string;
}
