import React from "react";
import { getRandomWidth } from "~/utils/random";

const ShowtimeItemLoading = () => {
  return (
    <div className="space-y-4">
      <div className="flex p-2 rounded-circle-md space-x-1 animate-pulse bg-second">
        <div className="h-48 w-32 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
        <div className="space-y-2 w-full">
          <div className="h-9 w-[40%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
        </div>
      </div>
      <div className="flex p-2 rounded-circle-md space-x-1 animate-pulse bg-second">
        <div className="h-48 w-32 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
        <div className="space-y-2 w-full">
          <div className="h-9 w-[40%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
          <div
            className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
            style={{ width: `${getRandomWidth()}px` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ShowtimeItemLoading;
