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

export interface IURLToBase64Response {
  error: any;
  data?: string;
}

export interface ICrawlResponse<T> {
  error: any;
  data?: T;
}
