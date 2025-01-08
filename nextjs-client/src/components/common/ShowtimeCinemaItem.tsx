import dayjs from "dayjs";
import React from "react";
import Button from "~/components/ui/Button";
import ImageCustom from "~/components/ui/ImageCustom";
import { IShowtimeByCinema } from "~/types/showtime.type";

interface ShowtimeCinemaItemProps {
  movie: IShowtimeByCinema;
}

const ShowtimeCinemaItem: React.FC<ShowtimeCinemaItemProps> = ({ movie }) => {
  return (
    <div className="flex p-2 bg-second rounded-circle-md space-x-4">
      <div className="w-auto h-fit rounded-circle-md overflow-hidden">
        <ImageCustom
          src={movie.poster}
          alt="NO POSTER"
          width={100}
          height={150}
        />
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-warning">
          {movie.movie_name}
        </h4>
        <div className="flex flex-wrap gap-1">
          {movie.showtimes &&
            movie.showtimes.length > 0 &&
            movie.showtimes.map((showtime) => {
              return (
                <Button key={showtime.showtime_id} buttonType="error">
                  {dayjs(showtime.start_time).format("HH:mm")}
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ShowtimeCinemaItem;
