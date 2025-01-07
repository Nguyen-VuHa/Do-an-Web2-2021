"use client";

import React from "react";
import Button from "~/components/ui/Button";
import ImageCustom from "~/components/ui/ImageCustom";
import { useGlobalStore } from "~/stores/global.store";

const ShowtimeByMovieItem = () => {
  const { setStateGlobal } = useGlobalStore();

  return (
    <div className="group relative flex flex-col justify-center items-center cursor-pointer shadow-lg shadow-second/20 rounded-circle-md bg-second p-1">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-layout/50 to-layout rounded-lg pointer-events-none z-[1]"></div>
      <div className="relative w-full h-movie-card rounded-circle-md overflow-hidden">
        <ImageCustom
          src={
            "https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-35.jpg"
          }
          alt="NO IMAGE"
          imgClassName="w-full h-full object-cover object-top"
          width={200}
          height={400}
        />
        <div
          className="
            absolute bottom-0 w-full h-[90px] z-[10] flex justify-center items-center 
            backdrop-blur-[4px] shadow-[0_-10px_10px_rgba(0,0,0,0.1)] border border-layout/20
            px-3
        "
        >
          <h4
            className="text-transparent 
            bg-clip-text bg-gradient-to-r from-instagram to-primary text-social-x text-center font-semibold overflow-hidden text-ellipsis line-clamp-3"
          >
            THE LAST DANCE: PHÁ ĐỊA NGỤC
          </h4>
        </div>
      </div>
      <div className="z-[10] flex w-full mt-1 space-x-1">
        <Button className="w-full" buttonType="info">
          Đặt vé
        </Button>
        <Button
          className="w-full"
          buttonType="error"
          onClick={() => {
            setStateGlobal("isModalViewTrailer", true);
            // setStateGlobal("trailerID", movieData.trailer_id);
          }}
        >
          Xem trailler
        </Button>
      </div>
    </div>
  );
};

export default ShowtimeByMovieItem;
