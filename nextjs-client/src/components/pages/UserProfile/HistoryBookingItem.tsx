import dayjs from "dayjs";
import React from "react";
import { IUserBookingHistory } from "~/types/user.type";

type HistoryBookingItemProps = {
  data: IUserBookingHistory;
};

const HistoryBookingItem: React.FC<HistoryBookingItemProps> = ({ data }) => {
  return (
    <div className="flex flex-col px-3 py-2 bg-second rounded-circle-md space-y-1">
      <div className="flex justify-between items-center space-x-2">
        <span className="text-lg font-semibold text-warning truncate">
          {data.movie_name}
        </span>
        <div className="flex-shrink-0 italic underline text-social-x hover:text-opacity-70 transition-all cursor-pointer">
          chi tiết vé
        </div>
      </div>
      <span className="text-sm text-instagram">
        Suất chiếu: {dayjs(data.showtime).format("HH:mm DD-MM-YYYY")}
      </span>
      <span className="text-sm text-instagram">Số ghế: {data.total_seat}</span>
      <span className="text-sm text-instagram">
        Trạng thái: <b className="text-success">Đặt vé thành công</b>
      </span>
      <span className="text-sm text-instagram">
        Tổng tiền: <b className="text-success">{data.total_amount.toLocaleString()} VNĐ</b>
      </span>
      <div className="!mt-5 flex justify-between items-center text-xs text-success md:justify-start space-x-2">
        <span>{dayjs(data.created_at).format("HH:mm DD/MM/YYYY")}</span>
        <div className="h-3 w-[1px] bg-success mx-4 max-md:hidden"></div>
        <span>Thanh toán VN Pay</span>
      </div>
    </div>
  );
};

export default HistoryBookingItem;
