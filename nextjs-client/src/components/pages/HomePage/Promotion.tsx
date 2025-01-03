"use client";

import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageCustom from "~/components/ui/ImageCustom";

const Promotion = () => {
  return (
    <div className="container mx-auto w-full">
      <Swiper
        className="select-none"
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 4000, // Chuyển slide mỗi 4 giây
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
      >
        <SwiperSlide>
          <ImageCustom
            imgClassName="w-full h-[400px] lg:h-[70vh]"
            src="https://bhdstar.vn/wp-content/uploads/2024/12/SuperSale-1.jpg"
            alt="NO PROMOTION"
            width={1024}
            height={720}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageCustom
            imgClassName="w-full  h-[400px] lg:h-[70vh]"
            src="https://bhdstar.vn/wp-content/uploads/2024/12/Banner-Web-T1-01-01.png"
            alt="NO PROMOTION"
            width={1024}
            height={720}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageCustom
            imgClassName="w-full  h-[400px] lg:h-[70vh]"
            src="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-21.jpg"
            alt="NO PROMOTION"
            width={1024}
            height={720}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Promotion;
