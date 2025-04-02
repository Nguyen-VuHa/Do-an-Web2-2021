export interface ISeatBooking {
  seat_id: number;
  seat_name: string;
}

export interface IBookingTicketForm {
  token: string;
  showtime_id: string;
  movie_id: string;
  screen_id: number;
  payment_method: string;
  seats: ISeatBooking[];
}
