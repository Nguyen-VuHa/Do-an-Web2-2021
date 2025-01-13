export interface IShowtimeByCinema {
  movie_name: string;
  slug: string;
  poster: string;
  showtimes: IShowtime[];
}

export interface IShowtime {
  showtime_id: string;
  start_time: string;
}

export interface IShowtimeByMovie {
  cinema_id: number;
  cinema_name: string;
  address: string;
  area: string;
  showtimes: IShowtime[];
}

export interface IShowtimeMovieResponse {
  areas: string[];
  showtimes: IShowtimeByMovie[];
}

interface IShowtimeMovieDetailResponse {
  movie_id: string;
  title: string;
  duration: number;
  poster: string;
}

export interface IShowtimeDetailResponse {
  showtime_id: string;
  start_time: string;
  end_time: string;
  unit_price: number;

  movie: IShowtimeMovieDetailResponse;
  screen: IScreenResponse;
}

export interface IScreenResponse {
  screen_id: number;
  screen_name: string;
  screen_type: string;
  created_at: string;
  status: string;
  seats: ISeatResponse[];
}

export interface ISeatResponse {
  seat_id: number;
  seat_name: string;
  x: number;
  y: number;
  status: number;
  seat_type: string;
  price_modifier: number;
}
