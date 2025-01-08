/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ShowtimeCinemaItem from "~/components/common/ShowtimeCinemaItem";
import ShowtimeItemLoading from "~/components/common/ShowtimeItemLoading";
import { useShowtimeStore } from "~/stores/showtime.store";

interface CinemaDetailRightContentProps {
  embed_url: string;
}

const CinemaDetailRightContent: React.FC<CinemaDetailRightContentProps> = ({
  embed_url,
}) => {
  const { slug } = useParams();
  const {
    isFetchShowtimeCinema,
    showtimeCinema,
    setStateShowtime,
    reqFetchShowtimeByCinema,
  } = useShowtimeStore();

  useEffect(() => {
    if (slug) {
      reqFetchShowtimeByCinema(slug as string);
    }

    return () => {
      setStateShowtime("showtimeCinema", []);
    };
  }, [slug]);

  return (
    <div className="col-span-2 space-y-2">
      <div className="bg-second h-fit rounded-circle-md overflow-hidden p-1">
        <iframe
          src={embed_url}
          className="w-full rounded-circle-md"
          height="350"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {isFetchShowtimeCinema && <ShowtimeItemLoading />}
      {showtimeCinema &&
        showtimeCinema.length > 0 &&
        showtimeCinema.map((movie) => {
          return <ShowtimeCinemaItem key={movie.movie_name} movie={movie} />;
        })}
    </div>
  );
};

export default CinemaDetailRightContent;
