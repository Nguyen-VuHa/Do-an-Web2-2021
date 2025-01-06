
export interface IMovieInfo {
    movie_id: string;
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
    showing: IMovieInfo[],
    comming_soon: IMovieInfo[],
}