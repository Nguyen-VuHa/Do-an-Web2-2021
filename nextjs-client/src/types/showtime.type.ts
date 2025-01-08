export interface IShowtimeByCinema {
  movie_name: string;
  poster: string;
  showtimes: IShowtime[];
}

export interface IShowtime {
  showtime_id: string;
  start_time: string;
}
