import React from "react";
import { INotify } from "~/types/notify.type";
import ImageCustom from "../ui/ImageCustom";
import { formatTime } from "~/utils/format";

type NotificationItemProps = {
  data: INotify;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {
  let className = ``;

  if (data.notify_status === "unread") {
    className = `!bg-social-x !bg-opacity-10`;
  }

  return (
    <div
      className={`p-2 flex space-x-2 cursor-pointer select-none rounded-md bg-layout bg-opacity-30
        text-typography text-sm
        hover:bg-warning hover:bg-opacity-50 hover:text-warning transition-all duration-300 ${className}`}
    >
      {data.image_url && (
        <div className="flex-shrink-0 w-[20%] h-full rounded-circle-md overflow-hidden">
          <ImageCustom
            imgClassName="w-full h-full"
            src={data.image_url}
            alt="NO NOTIFY IMG"
            width={200}
            height={300}
          />
        </div>
      )}
      <div className="flex flex-col justify-between space-y-2">
        <span className="whitespace-pre-line leading-relaxed">
          {data.message}
        </span>
        <span className="text-xs italic text-success">
          {formatTime(new Date(data.created_at))}
        </span>
      </div>
    </div>
  );
};

export default NotificationItem;
