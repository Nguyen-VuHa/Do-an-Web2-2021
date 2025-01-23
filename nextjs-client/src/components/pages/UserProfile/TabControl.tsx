import React from "react";

const TabControl = () => {
  return (
    <ul className="mb-5 flex list-none flex-row border-b-0 p-0">
      <li className="w-full md:w-fit">
        <div
          className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent text-center px-7 pb-3.5 pt-4 text-sm font-medium uppercase leading-tight text-neutral-500
            cursor-pointer
            ${"border-warning !text-warning bg-warning bg-opacity-10"} 
        text-white/50 hover:bg-neutral-700/60 transition-all rounded-tr-circle-md rounded-tl-circle-md`}
        >
          Lịch sử đặt vé
        </div>
      </li>
      <li className="w-full md:w-fit">
        <div
          className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent text-center px-7 pb-3.5 pt-4 text-sm font-medium uppercase leading-tight text-neutral-500
             cursor-pointer
            ${""} text-white/50 hover:bg-neutral-700/60 transition-all rounded-tr-circle-md rounded-tl-circle-md`}
        >
          Thống kê
        </div>
      </li>
    </ul>
  );
};

export default TabControl;
