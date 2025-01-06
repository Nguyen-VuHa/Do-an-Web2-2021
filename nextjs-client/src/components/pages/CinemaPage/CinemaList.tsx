"use client";

import React from "react";
import CinemaItem from "./CinemaItem";
import { ICinema } from "~/types/cinema.type";

interface CinemaListProps {
  cinemas: ICinema[];
}

const CinemaList: React.FC<CinemaListProps> = ({ cinemas }) => {
  return (
    <div className="container w-full h-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cinemas &&
        cinemas.length > 0 &&
        cinemas.map((cinema) => {
          return <CinemaItem key={cinema.cinema_id} data={cinema} />;
        })}
    </div>
  );
};

export default CinemaList;
