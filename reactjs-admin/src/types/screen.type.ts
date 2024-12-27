import { ICinema } from "./cinema.type";

export interface IScreen {
  screen_id: number;
  screen_name: string;
  screen_type: string;
  created_at: string;
  cinema: ICinema;
  status: string;
}
