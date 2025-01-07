import React from "react";
import { apiFetchMovies } from "~/apis/movie.api";
import MaintainceScreen from "~/components/common/MaintainceScreen";
import ShowtimeListByMovie from "~/components/pages/ShowtimePage/ShowtimeListByMovie";

export const metadata = {
  title: "Lịch chiếu phim - BHD Star",
};

const MovieShowingMain = async () => {
  try {
    const { data } = await apiFetchMovies();

    if (!data) {
      return;
    }

    return <ShowtimeListByMovie data={data} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <MaintainceScreen />;
  }
};

export default MovieShowingMain;
