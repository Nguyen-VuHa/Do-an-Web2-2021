import React from "react";
import CinemaList from "~/components/pages/CinemaPage/CinemaList";

export const metadata = {
  title: "Hệ thống rạp - BHD Star",
};

const CinemaMain = () => {
  return (
    <div className="container mx-auto py-10 flex flex-col items-center space-y-10">
      <h1 className="text-3xl font-semibold gradient-text">
        Hệ thống rạp chiếu
      </h1>
      <CinemaList />
    </div>
  );
};

export default CinemaMain;
