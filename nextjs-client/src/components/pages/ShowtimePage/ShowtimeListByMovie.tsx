import React from "react";
import ShowtimeByMovieItem from "./ShowtimeByMovieItem";

const ShowtimeListByMovie = () => {
  return (
    <div className="space-y-5">
      <h2
        className="text-center text-4xl font-semibold text-transparent
                bg-clip-text bg-gradient-to-r from-social-x to-instagram w-fit max-sm:text-3xl"
      >
        Phim Đang Chiếu
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <ShowtimeByMovieItem />
      </div>
      <h2
        className="text-center text-4xl font-semibold text-transparent
                bg-clip-text bg-gradient-to-r from-social-x to-instagram w-fit max-sm:text-3xl"
      >
        Coming Soon
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <ShowtimeByMovieItem />
      </div>
    </div>
  );
};

export default ShowtimeListByMovie;
