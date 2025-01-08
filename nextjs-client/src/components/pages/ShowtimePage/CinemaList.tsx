/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import CinemaCard from "~/components/common/CinemaCard";
import { useCinemaStore } from "~/stores/cinema.store";
import { useShowtimeStore } from "~/stores/showtime.store";
import { ICinema } from "~/types/cinema.type";

interface CinemaListProps {
  cinemas: ICinema[];
}

const CinemaList: React.FC<CinemaListProps> = ({ cinemas }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Để lấy các query parameters hiện tại
  const cinemaQuery = searchParams.get("_rap"); // Lấy giá trị của _rap nếu có

  const handleAddQuery = (cinemaSlug: string) => {
    // Lấy URL hiện tại
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("_rap", cinemaSlug); // Thêm hoặc cập nhật query ?_rap=galaxy

    // Sử dụng router để thay đổi URL
    router.push(currentUrl.toString());
  };

  const { cinemaArea, cinemaList, setStateCinema } = useCinemaStore();
  const {
    isFetchShowtimeCinema,
    cinemaSelect,
    setStateShowtime,
    reqFetchShowtimeByCinema,
  } = useShowtimeStore();

  useEffect(() => {
    if (cinemaQuery) {
      reqFetchShowtimeByCinema(cinemaQuery);

      const cinemaBySlug = cinemas.find(
        (cinema) => cinema.slug === cinemaQuery,
      );
      setStateShowtime("cinemaSelect", cinemaBySlug?.cinema_name);
    }

    return () => {
      setStateShowtime("cinemaSelect", "");
    };
  }, [cinemaQuery]);

  useEffect(() => {
    setStateCinema("cinemaList", cinemas);
  }, [cinemas]);

  useEffect(() => {
    if (cinemaArea === "ALL") {
      setStateCinema("cinemaList", cinemas);
      return;
    }

    setStateCinema(
      "cinemaList",
      cinemas.filter((cinema) => cinema.area === cinemaArea),
    );
  }, [cinemaArea]);

  return (
    <div className="container w-full h-full grid grid-cols-1 gap-5 md:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {/* Render ở server side để SEO */}
      {(!cinemaList || cinemaList.length <= 0) &&
        cinemas.length > 0 &&
        cinemas.map((cinema) => {
          return (
            <CinemaCard
              key={cinema.cinema_id}
              data={cinema}
              wrapperImageClass="h-[150px]"
            />
          );
        })}
      {cinemaList &&
        cinemaList.length > 0 &&
        cinemaList.map((cinema) => {
          return (
            <CinemaCard
              key={cinema.cinema_id}
              data={cinema}
              wrapperImageClass="h-[150px]"
              onClick={() => {
                if (
                  !isFetchShowtimeCinema &&
                  cinemaSelect != cinema.cinema_name
                ) {
                  handleAddQuery(cinema.slug);
                  setStateShowtime("cinemaSelect", cinema.cinema_name);
                  reqFetchShowtimeByCinema(cinema.slug);
                }
              }}
            />
          );
        })}
    </div>
  );
};

export default CinemaList;
