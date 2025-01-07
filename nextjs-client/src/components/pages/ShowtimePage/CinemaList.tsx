
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import CinemaCard from "~/components/common/CinemaCard";
import { useCinemaStore } from "~/stores/cinema.store";
import { ICinema } from "~/types/cinema.type";

interface CinemaListProps {
  cinemas: ICinema[];
}

const CinemaList: React.FC<CinemaListProps> = ({ cinemas }) => {
  const { cinemaArea, cinemaList, setStateCinema } = useCinemaStore();

  useEffect(() => {
    setStateCinema("cinemaList", cinemas);
  }, [cinemas]);

  useEffect(() => {
    if (cinemaArea === "ALL") {
      setStateCinema("cinemaList", cinemas);
      return;
    }

    setStateCinema(
      "cinemaList",
      cinemas.filter((cinema) => cinema.area === cinemaArea),
    );
  }, [cinemaArea]);

  return (
    <div className="container w-full h-full grid grid-cols-1 gap-5 md:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {/* Render ở server side để SEO */}
      {(!cinemaList || cinemaList.length <= 0) &&
        cinemas.length > 0 &&
        cinemas.map((cinema) => {
          return (
            <CinemaCard
              key={cinema.cinema_id}
              data={cinema}
              wrapperImageClass="h-[150px]"
            />
          );
        })}
      {cinemaList &&
        cinemaList.length > 0 &&
        cinemaList.map((cinema) => {
          return (
            <CinemaCard
              key={cinema.cinema_id}
              data={cinema}
              wrapperImageClass="h-[150px]"
            />
          );
        })}
    </div>
  );
};

export default CinemaList;
