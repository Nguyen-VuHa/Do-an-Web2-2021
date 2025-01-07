import React from "react";
import { apiFetchCinemaArea, apiFetchCinemas } from "~/apis/cinema.api";
import MaintainceScreen from "~/components/common/MaintainceScreen";
import CinemaList from "~/components/pages/ShowtimePage/CinemaList";
import CinemaArea from "~/components/pages/ShowtimePage/CinemaArea";

export const metadata = {
  title: "Lịch chiếu theo rạp - BHD Star",
};

const MovieByCinemaMain = async () => {
  try {
    const resArea = await apiFetchCinemaArea();
    const resCinemas = await apiFetchCinemas();

    return (
      <div className="space-y-5">
        <CinemaArea data={resArea?.data || []} />
        <CinemaList cinemas={resCinemas?.data || []} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <MaintainceScreen />;
  }
};

export default MovieByCinemaMain;
