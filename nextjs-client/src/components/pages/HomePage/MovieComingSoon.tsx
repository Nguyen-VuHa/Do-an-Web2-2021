"use client";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "~/components/common/MovieCard";

const MovieComingSoon = () => {
  return (
    <div className="space-y-10 max-sm:px-8">
      <h2
        className="text-center text-4xl font-semibold text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-instagram w-fit max-sm:text-3xl"
      >
        Coming Soon
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
        <SwiperSlide>
          <MovieCard
            imgURL="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-18.jpg"
            cardType="coming-soon"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            imgURL="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-18.jpg"
            cardType="coming-soon"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            imgURL="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-18.jpg"
            cardType="coming-soon"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            imgURL="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-18.jpg"
            cardType="coming-soon"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            imgURL="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-18.jpg"
            cardType="coming-soon"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            imgURL="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-18.jpg"
            cardType="coming-soon"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MovieComingSoon;
