import React from "react";
const NotificationLoading = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div
        className="p-2 flex space-x-2 cursor-pointer select-none rounded-md bg-layout bg-opacity-30
        text-typography text-sm
        hover:bg-warning hover:bg-opacity-50 hover:text-warning transition-all duration-300 animate-pulse"
      >
        <div className="flex-shrink-0 w-[25%] h-full">
          <div className="h-20 w-full rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
        </div>
        <div className="w-full h-full flex flex-col space-y-2">
          <div
            className={`h-4 w-[50%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
          ></div>
          <div
            className={`h-4 w-[70%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
          ></div>
          <div
            className={`h-2 w-[35%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
          ></div>
        </div>
      </div>
      <div
        className="p-2 flex space-x-2 cursor-pointer select-none rounded-md bg-layout bg-opacity-30
        text-typography text-sm
        hover:bg-warning hover:bg-opacity-50 hover:text-warning transition-all duration-300 animate-pulse"
      >
        <div className="flex-shrink-0 w-[25%] h-full">
          <div className="h-20 w-full rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
        </div>
        <div className="w-full h-full flex flex-col space-y-2">
          <div
            className={`h-4 w-[50%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
          ></div>
          <div
            className={`h-4 w-[70%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
          ></div>
          <div
            className={`h-2 w-[35%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationLoading;
