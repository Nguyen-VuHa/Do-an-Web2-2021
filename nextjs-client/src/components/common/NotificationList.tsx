"use client";
import React from "react";
import NotificationItem from "./NotificationItem";
import { TbBellXFilled } from "react-icons/tb";
import { useNotifyStore } from "~/stores/notify.store";
import NotificationLoading from "./NotificationLoading";

const NotificationList = () => {
  const { isFetchNotify, notify } = useNotifyStore();

  return (
    <div className="w-full h-auto max-h-[600px] overflow-hidden hover:overflow-auto ">
      {!isFetchNotify && (
        <>
          {notify.length > 0 ? (
            <div className="px-4 pb-4 space-y-2">
              {notify.map((noti) => {
                return <NotificationItem key={noti.notify_id} data={noti} />;
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2 px-4 py-10 text-social-x">
              <TbBellXFilled size={60} />
              <span className="text-lg">Không có thông báo nào.</span>
            </div>
          )}
        </>
      )}
      {isFetchNotify && <NotificationLoading />}
    </div>
  );
};

export default NotificationList;
