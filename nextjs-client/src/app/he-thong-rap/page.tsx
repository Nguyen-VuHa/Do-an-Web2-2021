import React from "react";
import { apiFetchCinemas } from "~/apis/cinema.api";
import MaintainceScreen from "~/components/common/MaintainceScreen";
import CinemaList from "~/components/pages/CinemaPage/CinemaList";

export const metadata = {
  title: "Hệ thống rạp - BHD Star",
};

const CinemaMain = async () => {
  try {
    const resCinemas = await apiFetchCinemas();

    return (
      <div className="container mx-auto py-10 flex flex-col items-center space-y-10">
        <h1 className="text-3xl font-semibold gradient-text">
          Hệ thống rạp chiếu
        </h1>
        <CinemaList cinemas={resCinemas.data || []} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <MaintainceScreen />;
  }
};

export default CinemaMain;
