import { ICinema } from './cinema.type';
import { ISeatForm } from './seat.type';

export interface IScreen {
  screen_id: number;
  screen_name: string;
  screen_type: string;
  created_at: string;
  cinema: ICinema;
  status: string;
  seats: ISeatForm[];
}

export interface IScreenForm {
  screen_name: string;
  screen_type: string;
  cinema: number | null;
}

export interface IScreenSelection {
  screen_id: number;
  screen_name: string;
}
