export interface IShowtime {
  showtime_id: string;
  start_time: string;
  end_time: string;
  unit_price: number;
  created_at: string;
  status: string;
}

export interface IShowtimeForm {
  start_date: string;
  unit_price: number;
  screen: number;
  movie: string;
}
