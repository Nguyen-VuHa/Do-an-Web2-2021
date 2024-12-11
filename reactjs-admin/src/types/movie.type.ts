export interface IMovieForm {
  title: string;
  duration: number | null;
  start_date: string;
  end_date: string;
  trailer_id: string;
  description: string;
}

export interface IMovie {
  movie_id: string;
  title: string;
  duration: number;
  start_date: string;
  end_date: string;
  movie_type: string;
  status: string;
}
