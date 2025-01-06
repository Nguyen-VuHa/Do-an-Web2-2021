"use client";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "~/components/common/MovieCard";
import { IMovieInfo } from "~/types/movie.type";

interface MovieShowingProps {
  movieShowing?: IMovieInfo[],
}

const MovieShowing: React.FC<MovieShowingProps> = ({
  movieShowing,
}) => {
  return (
    <div className="space-y-10 max-sm:px-8">
      <h2
        className="text-center text-4xl font-semibold text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-instagram w-fit max-sm:text-3xl"
      >
        Phim Đang Chiếu
      </h2>
      <Swiper
        className="select-none"
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2, // Hiển thị 1 slide khi màn hình <= 640px
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3, // Hiển thị 2 slide khi màn hình <= 768px
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5, // Hiển thị 3 slide khi màn hình <= 1024px
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5, // Hiển thị 4 slide khi màn hình lớn hơn 1280px
            spaceBetween: 40,
          },
        }}
      >
        {
          movieShowing && movieShowing.length > 0
          && movieShowing.map((movie) => {
            return  <SwiperSlide key={movie.movie_id}>
              <MovieCard movieData={movie} />
            </SwiperSlide>
          })
        }
      </Swiper>
    </div>
  );
};

export default MovieShowing;
