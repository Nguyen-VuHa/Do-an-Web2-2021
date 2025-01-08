import React from "react";
import MovieCard from "~/components/common/MovieCard";
import { MOVIE_COMING_SOON } from "~/constants/movie";
import { IMovie } from "~/types/movie.type";

interface ShowtimeListByMovieProps {
  data: IMovie;
}

const ShowtimeListByMovie: React.FC<ShowtimeListByMovieProps> = ({ data }) => {
  return (
    <div className="space-y-5">
      <h2
        className="text-center text-4xl font-semibold text-transparent
                bg-clip-text bg-gradient-to-r from-social-x to-instagram w-fit max-sm:text-3xl"
      >
        Phim Đang Chiếu
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.showing &&
          data.showing.length > 0 &&
          data.showing.map((movie) => {
            return <MovieCard key={movie.movie_id} movieData={movie} />;
          })}
      </div>
      <h2
        className="text-center text-4xl font-semibold text-transparent
                bg-clip-text bg-gradient-to-r from-social-x to-instagram w-fit max-sm:text-3xl"
      >
        Coming Soon
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.comming_soon &&
          data.comming_soon.length > 0 &&
          data.comming_soon.map((movie) => {
            return (
              <MovieCard
                key={movie.movie_id}
                cardType={MOVIE_COMING_SOON}
                movieData={movie}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ShowtimeListByMovie;
