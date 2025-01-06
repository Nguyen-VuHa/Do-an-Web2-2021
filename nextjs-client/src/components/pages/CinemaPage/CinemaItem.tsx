import React from "react";
import ImageCustom from "~/components/ui/ImageCustom";
import { ICinema } from "~/types/cinema.type";

interface CinemaItemProps {
  data: ICinema;
}

const BANNER_CINEMA_DEFAULT =
  "https://bhdstar.vn/wp-content/uploads/2023/12/0000000005.png";

const CinemaItem: React.FC<CinemaItemProps> = ({ data }) => {
  return (
    <div
      className="
                w-full h-full rounded-circle-md bg-second p-2 shadow-lg
                cursor-pointer bg-second hover:bg-opacity-40
                transition-all duration-300 space-y-2
            "
    >
      <div className="w-full h-[200px] rounded-circle-md overflow-hidden">
        <ImageCustom
          imgClassName="w-full h-full"
          src={BANNER_CINEMA_DEFAULT}
          alt="NO CINEMA IMG"
          width={200}
          height={100}
        />
      </div>
      <h4
        className="text-xl font-semibold text-transparent
            bg-clip-text bg-gradient-to-r from-instagram to-facebook"
      >
        {data.cinema_name}
      </h4>
      <div className="space-y-2">
        <span className="text-sm text-social-x italic">{data.address}</span>
      </div>
    </div>
  );
};

export default CinemaItem;
