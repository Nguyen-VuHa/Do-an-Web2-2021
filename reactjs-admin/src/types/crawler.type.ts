export interface ICrawlMovieDetail {
  title: string;
  description: string;
  director: string;
  actors: string;
  categories: string;
  start_date: string;
  end_date: string;
  duration: string;
  trailer_id: string;
  poster_url: string[];
  poster_upload: string[];
}

export interface ICrawlMovieResponse {
  error: any;
  data?: ICrawlMovieDetail[];
}
