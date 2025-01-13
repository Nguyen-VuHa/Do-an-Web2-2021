import dayjs from "dayjs";
import React from "react";
import ImageCustom from "~/components/ui/ImageCustom";
import { useShowtimeStore } from "~/stores/showtime.store";

const MovieInfo = () => {
  const { showtimeDetail } = useShowtimeStore();

  return (
    <div className="flex w-full p-2 rounded-circle-md bg-second space-x-4">
      <div className="w-[20%] h-full">
        <ImageCustom
          imgClassName="w-full h-full overflow-hidden rounded-circle-md"
          src={showtimeDetail?.movie.poster || ""}
          alt="NO POSTER"
          width={100}
          height={120}
        />
      </div>
      <div className="flex flex-col space-y-2 text-warning">
        <span>{showtimeDetail?.movie.title}</span>
        <span>Giá vé: {showtimeDetail?.unit_price?.toLocaleString()} đ</span>
        <span>Thời lượng: {showtimeDetail?.movie.duration} phút</span>
        <span>
          Suất chiếu: {dayjs(showtimeDetail?.start_time).format("HH:mm")}
        </span>
        <span>
          {dayjs(showtimeDetail?.start_time).format("HH:mm")} ~{" "}
          {dayjs(showtimeDetail?.end_time).format("HH:mm")}{" "}
          {dayjs(showtimeDetail?.start_time).format("DD/MM/YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieInfo;
