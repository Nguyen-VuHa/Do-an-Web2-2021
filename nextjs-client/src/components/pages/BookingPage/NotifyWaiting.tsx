import React from "react";
import { IoTicketOutline } from "react-icons/io5";

const NotifyWaiting = () => {
  return (
    <>
      <IoTicketOutline size={100} className="stroke-social-x" />
      <span className="text-2xl text-center text-social-x">
        Đang tiến hành xử lý đặt vé ...
      </span>
      <div
        className={`h-20 w-20 animate-spin rounded-full border-4 border-solid border-t-transparent border-social-x`}
      />
    </>
  );
};

export default NotifyWaiting;
