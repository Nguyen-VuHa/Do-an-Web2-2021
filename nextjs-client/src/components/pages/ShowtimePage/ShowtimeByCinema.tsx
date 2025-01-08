/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import ShowtimeCinemaItem from "~/components/common/ShowtimeCinemaItem";
import ShowtimeItemLoading from "~/components/common/ShowtimeItemLoading";
import { useShowtimeStore } from "~/stores/showtime.store";

const ShowtimeByCinema = () => {
  const showtimeRef = useRef<HTMLDivElement>(null);
  const {
    isFetchShowtimeCinema,
    cinemaSelect,
    showtimeCinema,
    errorMessage,
    setStateShowtime,
  } = useShowtimeStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      setStateShowtime("errorMessage", "");
    }
  }, [errorMessage]);

  useEffect(() => {
    if (cinemaSelect && showtimeRef.current) {
      showtimeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [cinemaSelect]);

  return (
    <div ref={showtimeRef} className="space-y-10 pt-20">
      {cinemaSelect && (
        <>
          <h3 className="text-center text-3xl font-semibold uppercase pt-2 gradient-text">
            Lịch chiếu của rạp {cinemaSelect}
          </h3>
          <div className="space-y-3">
            {isFetchShowtimeCinema && <ShowtimeItemLoading />}
            {(!isFetchShowtimeCinema &&
              showtimeCinema &&
              showtimeCinema.length > 0 &&
              showtimeCinema.map((movie) => {
                return (
                  <ShowtimeCinemaItem key={movie.movie_name} movie={movie} />
                );
              })) || (
              <div className="text-warning text-2xl text-center">
                Hiện không có suất chiếu nào ở rạp này.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowtimeByCinema;
