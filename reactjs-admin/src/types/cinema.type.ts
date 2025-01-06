export interface ICinema {
  cinema_id: number;
  cinema_name: string;
  slug: string;
  address: string;
  area: string;
  embed_map_url: string;
  created_at: string;
  status: string;
  banner: ICinemaBanner;
}

export interface ICinemaForm {
  cinema_name: string;
  slug: string;
  address: string;
  area: string;
  embed_map_url: string;
}

export interface ICinemaBanner {
  cinema_banner_id: number;
  banner_url: string;
}
