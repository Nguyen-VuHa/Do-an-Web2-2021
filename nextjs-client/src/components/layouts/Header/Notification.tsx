/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { PiBellRingingLight } from "react-icons/pi";
import NotificationList from "~/components/common/NotificationList";
import { SOCKET_RECEIVE_NOTIFICATION } from "~/constants/socket";
import { useNotifyStore } from "~/stores/notify.store";
import useSocketStore from "~/stores/socket.store";
import { INotify } from "~/types/notify.type";

const Notification = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const {
    notify_unread,
    isFetchNotify,
    pagination,
    notify,
    getNotifyList,
    updateNotifyStatus,
    setStateNotify,
  } = useNotifyStore();

  const { socket } = useSocketStore();

  const [notifyReceive, setNotifyReceive] = useState<INotify | null>(null);

  useEffect(() => {
    if (notifyReceive) {
      const isExists = notify.some(
        (noti) => noti.notify_id === notifyReceive.notify_id,
      );

      if (!isExists) {
        setStateNotify("notify", [notifyReceive].concat(notify));
        setStateNotify("notify_unread", notify_unread + 1);
      }
    }
  }, [notifyReceive]);

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_RECEIVE_NOTIFICATION, (data) => {
        setNotifyReceive(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsActive(false); // Đóng dropdown nếu click ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="relative w-10 h-10 bg-second cursor-pointer rounded-full flex justify-center items-center text-warning bg-warning bg-opacity-30
    hover:bg-opacity-50 transtion-all duration-300"
        ref={buttonRef}
        onClick={() => {
          if (!isFetchNotify && !isActive) {
            getNotifyList({
              _page: pagination.page,
              _page_size: pagination.page_size,
            });
            setStateNotify("notify_unread", 0);
            updateNotifyStatus();
          }

          setIsActive(!isActive);
        }}
      >
        <PiBellRingingLight size={22} />
        {notify_unread > 0 && (
          <span
            className="
            absolute top-[-5px] right-[-5px] 
            flex justify-center items-center
            w-5 h-5 bg-youtube rounded-full bg-opacity-70 text-typography
            text-xs
            "
          >
            {notify_unread > 9 ? `+9` : notify_unread}
          </span>
        )}
      </div>
      <div
        ref={dropdownRef}
        className={`
                  absolute top-[105%] right-0 bg-second rounded-circle-md space-y-3 shadow-2xl w-[600px]
                  transition-all duration-300
                  ${isActive ? "visible opacity-100 z-[100]" : "invisible opacity-0 z-[-99]"}
              `}
      >
        <div className="text-lg font-semibold text-warning p-4 pb-0">
          Thông báo
        </div>
        <NotificationList />
      </div>
    </div>
  );
};

export default Notification;
