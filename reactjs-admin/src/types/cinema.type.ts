export interface ICinema {
  cinema_id: number;
  cinema_name: string;
  slug: string;
  address: string;
  area: string;
  embed_map_url: string;
  created_at: string;
  status: string;
}

export interface ICinemaForm {
  cinema_name: string;
  slug: string;
  address: string;
  area: string;
  embed_map_url: string;
}
