export interface IMovieInfo {
  movie_id: string;
  slug: string;
  title: string;
  duration: number;
  start_date: string;
  end_date: string;
  description: string;
  trailer_id: string;
  director: string;
  poster: string;
  actors: string;
  categories: string;
}

export interface IMovie {
  showing: IMovieInfo[];
  comming_soon: IMovieInfo[];
}

export interface IMovieDetail extends IMovieInfo {
  posters: string[];
}
