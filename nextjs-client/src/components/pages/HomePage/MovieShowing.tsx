"use client";

import React, { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonSlideNext from "~/components/common/ButtonSlideNext";
import ButtonSlidePrev from "~/components/common/ButtonSlidePrev";
import MovieCard from "~/components/common/MovieCard";
import { IMovieInfo } from "~/types/movie.type";

interface MovieShowingProps {
  movieShowing?: IMovieInfo[];
}

const MovieShowing: React.FC<MovieShowingProps> = ({ movieShowing }) => {
  const swiperRef = useRef<any | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext(); // Điều khiển chuyển đến slide tiếp theo
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev(); // Điều khiển chuyển đến slide tiếp theo
    }
  };

  return (
    <div className="space-y-10 max-sm:px-8">
      <h2
        className="text-center text-4xl font-semibold text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-instagram w-fit max-sm:text-3xl"
      >
        Phim Đang Chiếu
      </h2>
      <Swiper
        ref={swiperRef}
        className="select-none"
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 5000, // Chuyển slide mỗi 5 giây
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
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
        {movieShowing &&
          movieShowing.length > 0 &&
          movieShowing.map((movie) => {
            return (
              <SwiperSlide key={movie.movie_id}>
                <MovieCard movieData={movie} />
              </SwiperSlide>
            );
          })}

        <ButtonSlidePrev
          onClick={() => handlePrevClick()}
          className="absolute top-[45%] left-[5px] z-[999]"
          ref={prevRef}
        />
        <ButtonSlideNext
          ref={nextRef}
          onClick={() => handleNextClick()}
          className="absolute top-[45%] right-[5px] z-[999]"
        />
      </Swiper>
    </div>
  );
};

export default React.memo(MovieShowing);
