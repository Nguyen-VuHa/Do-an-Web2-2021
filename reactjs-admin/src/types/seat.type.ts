export interface ISeat {
  id: number;
  x: number;
  y: number;
  label: string;
  status: number;
}

export interface ISeatForm {
  seat_id: number;
  seat_name: string;
  x: number;
  y: number;
  status: number;
}
