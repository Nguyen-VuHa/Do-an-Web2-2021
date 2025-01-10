/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiImpactPoint } from "react-icons/gi";
import ShowtimeItemLoading from "~/components/common/ShowtimeItemLoading";
import ShowtimeMovieItem from "~/components/common/ShowtimeMovieItem";
import { MOVIE_COMING_SOON } from "~/constants/movie";
import { useShowtimeStore } from "~/stores/showtime.store";

interface ShowtimeMovieProps {
  movieName?: string;
  movieSlug?: string;
}

const ShowtimeMovie: React.FC<ShowtimeMovieProps> = ({ movieName, movieSlug }) => {
  const showtimeRef = useRef<HTMLDivElement>(null);
  const { movie_id, status } = useParams();
  const {
    isFetchShowtimeMovie,
    showtimeMovie,
    showtimeArea,
    isShowtimeView,
    setStateShowtime,
    reqFetchShowtimeByMovie,
  } = useShowtimeStore();
  const [areaSelect, setAreaSelect] = useState<string>("ALL");

  useEffect(() => {
    if (movie_id) {
      reqFetchShowtimeByMovie(movie_id.toString());
    }
  }, []);

  useEffect(() => {
    if (isShowtimeView && showtimeRef.current) {
      showtimeRef.current.scrollIntoView({ behavior: "smooth" });

      return () => {
        setStateShowtime("isShowtimeView", 0);
      };
    }
  }, [isShowtimeView]);

  return (
    <div
      ref={showtimeRef}
      className={`container mx-auto space-y-4 px-5 md:px-0 ${status === MOVIE_COMING_SOON ? "hidden" : ""}`}
    >
      <h2
        className="text-3xl font-bold inline-block text-transparent
                bg-clip-text bg-gradient-to-r from-social-x to-youtube border-2 border-transparent
                max-sm:text-3xl "
      >
        Lịch chiếu cho phim {movieName}
      </h2>
      <div className="space-y-2">
        {isFetchShowtimeMovie && <ShowtimeItemLoading />}
        {!isFetchShowtimeMovie && (
          <>
            <div className="flex flex-wrap gap-1">
              <div
                className={`px-3 py-2 cursor-pointer rounded-md ${areaSelect === "ALL" ? "!text-social-x bg-social-x bg-opacity-50" : "bg-second text-typography bg-opacity-70 "}
                        hover:text-social-x hover:bg-social-x hover:bg-opacity-30 transition-all`}
                onClick={() => {
                  setAreaSelect("ALL");
                }}
              >
                Tất cả rạp
              </div>
              {showtimeArea &&
                showtimeArea.length > 0 &&
                showtimeArea.map((dt) => {
                  return (
                    <div
                      key={dt}
                      onClick={() => {
                        setAreaSelect(dt);
                      }}
                      className={`px-3 py-2 cursor-pointer rounded-md ${areaSelect === dt ? "!text-social-x bg-social-x bg-opacity-50" : "bg-second text-typography bg-opacity-70 "}
                            hover:text-social-x hover:bg-social-x hover:bg-opacity-30 transition-all`}
                    >
                      {dt}
                    </div>
                  );
                })}
            </div>
            {showtimeArea &&
              showtimeArea.length > 0 &&
              showtimeArea.map((area) => {
                if (areaSelect !== "ALL" && areaSelect !== area) {
                  return;
                }

                const showtimeBy = showtimeMovie.filter(
                  (showtime) => showtime.area === area,
                );
                return (
                  <div key={area} className="space-y-2">
                    <h4 className="text-xl font-semibold text-warning flex items-center space-x-2">
                      <GiImpactPoint /> <span>{area}</span>
                    </h4>
                    {showtimeBy &&
                      showtimeBy.length > 0 &&
                      showtimeBy.map((showtime) => {
                        return (
                          <ShowtimeMovieItem
                            key={showtime.cinema_id}
                            cinema={showtime}
                            movieSlug={movieSlug}
                          />
                        );
                      })}
                  </div>
                );
              })}
          </>
        )}
        {!isFetchShowtimeMovie &&
          showtimeMovie &&
          showtimeMovie.length <= 0 && (
            <div className="text-warning text-2xl text-center">
              Hiện không có suất chiếu nào cho phim này.
            </div>
          )}
      </div>
    </div>
  );
};

export default ShowtimeMovie;
