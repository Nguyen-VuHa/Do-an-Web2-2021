"use client";
import React from "react";
import { useCinemaStore } from "~/stores/cinema.store";

interface CinemaAreaProps {
  data: string[];
}

const CinemaArea: React.FC<CinemaAreaProps> = ({ data }) => {
  const { cinemaArea, setStateCinema } = useCinemaStore();
  return (
    <div className="flex flex-wrap gap-2">
      <div
        className={`px-3 py-2 cursor-pointer rounded-md ${cinemaArea === "ALL" ? "!text-social-x bg-social-x bg-opacity-50" : "bg-second text-typography bg-opacity-70 "}
        hover:text-social-x hover:bg-social-x hover:bg-opacity-30 transition-all`}
        onClick={() => {
          setStateCinema("cinemaArea", "ALL");
        }}
      >
        Tất cả rạp
      </div>
      {data &&
        data.length > 0 &&
        data.map((dt) => {
          return (
            <div
              key={dt}
              onClick={() => {
                setStateCinema("cinemaArea", dt);
              }}
              className={`px-3 py-2 cursor-pointer rounded-md ${cinemaArea === dt ? "!text-social-x bg-social-x bg-opacity-50" : "bg-second text-typography bg-opacity-70 "}
              hover:text-social-x hover:bg-social-x hover:bg-opacity-30 transition-all`}
            >
              {dt}
            </div>
          );
        })}
    </div>
  );
};

export default CinemaArea;
