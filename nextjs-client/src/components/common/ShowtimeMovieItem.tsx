import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import Button from "~/components/ui/Button";
import ImageCustom from "~/components/ui/ImageCustom";
import { useUserStore } from "~/stores/user.store";
import { IShowtimeByMovie } from "~/types/showtime.type";

interface ShowtimeMovieItemProps {
  cinema: IShowtimeByMovie;
  movieSlug?: string;
}

const ShowtimeMovieItem: React.FC<ShowtimeMovieItemProps> = ({
  cinema,
  movieSlug,
}) => {
  const router = useRouter();
  const { isUserLoged } = useUserStore();

  return (
    <div className="flex flex-col p-2 bg-second rounded-circle-md space-y-2">
      <div className="flex space-x-4">
        <div className="w-auto h-fit rounded-circle-md overflow-hidden">
          <ImageCustom
            src={
              "https://bhdstar.vn/wp-content/themes/loodo-starter/inc/imgs/bhdIcon.png"
            }
            alt="NO POSTER"
            width={50}
            height={50}
          />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-semibold text-warning">
            {cinema.cinema_name}
          </h4>
          <span className="italic text-social-x text-sm">{cinema.address}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {cinema.showtimes &&
          cinema.showtimes.length > 0 &&
          cinema.showtimes.map((showtime) => {
            return (
              <Button
                key={showtime.showtime_id}
                buttonType="error"
                onClick={() => {
                  if (isUserLoged) {
                    router.push(`/dat-ve/${movieSlug}/${showtime.showtime_id}`);
                    return;
                  }

                  enqueueSnackbar("Vui lòng đăng nhập để mua vé nhé!", {
                    variant: "info",
                  });

                  router.push(`/dang-nhap?redirect=${`/dat-ve/${movieSlug}/${showtime.showtime_id}`}`);
                }}
              >
                {dayjs(showtime.start_time).format("HH:mm")}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default ShowtimeMovieItem;
