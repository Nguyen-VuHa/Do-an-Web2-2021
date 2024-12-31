import { Actor, Category, Director, Poster } from './movie-meta.type';

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

export interface IDetailMovie extends IMovie {
  trailer_id: string;
  description: string;
  director: Director;
  actors: Actor[];
  categories: Category[];
  posters: Poster[];
}

export interface IMovieSelection {
  movie_id: string;
  movie_name: string;
}
