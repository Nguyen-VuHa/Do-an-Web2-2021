"use client";

import React, { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonSlideNext from "~/components/common/ButtonSlideNext";
import ButtonSlidePrev from "~/components/common/ButtonSlidePrev";
import ImageCustom from "~/components/ui/ImageCustom";

const Promotion = () => {
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
    <div className="container mx-auto w-full">
      <Swiper
        ref={swiperRef}
        className="select-none"
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 4000, // Chuyển slide mỗi 4 giây
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
      >
        <SwiperSlide>
          <ImageCustom
            imgClassName="w-full h-[400px] lg:h-[70vh] max-sm:h-auto"
            src="https://bhdstar.vn/wp-content/uploads/2024/12/SuperSale-1.jpg"
            alt="NO PROMOTION"
            width={1024}
            height={720}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageCustom
            imgClassName="w-full  h-[400px] lg:h-[70vh] max-sm:h-auto"
            src="https://bhdstar.vn/wp-content/uploads/2024/12/Banner-Web-T1-01-01.png"
            alt="NO PROMOTION"
            width={1024}
            height={720}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageCustom
            imgClassName="w-full  h-[400px] lg:h-[70vh] max-sm:h-auto"
            src="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-21.jpg"
            alt="NO PROMOTION"
            width={1024}
            height={720}
          />
        </SwiperSlide>
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

export default Promotion;
