"use client";

import React from "react";
import CinemaItem from "./CinemaItem";

const CinemaList = () => {
  return (
    <div className="container w-full h-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CinemaItem />
    </div>
  );
};

export default CinemaList;
