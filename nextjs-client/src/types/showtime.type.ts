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
