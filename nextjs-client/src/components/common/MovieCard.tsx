"use client";

import React from "react";
import ImageCustom from "../ui/ImageCustom";
import Button from "../ui/Button";
import { IMovieInfo } from "~/types/movie.type";
import { useGlobalStore } from "~/stores/global.store";
import { useRouter } from "next/navigation";
import { MOVIE_COMING_SOON, MOVIE_NOW_SHOWING } from "~/constants/movie";
import { MovieTypeEnum } from "~/types/common.type";

interface MovieCardProps {
  movieData: IMovieInfo;
  cardType?: (typeof MovieTypeEnum)[keyof typeof MovieTypeEnum];
}

const MovieCard: React.FC<MovieCardProps> = ({
  movieData,
  cardType = MOVIE_NOW_SHOWING,
}) => {
  const { setStateGlobal } = useGlobalStore();
  const router = useRouter();

  return (
    <div className="group relative flex justify-center items-center cursor-pointer overflow-hidden rounded-circle-md">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-layout/50 to-layout rounded-lg pointer-events-none z-[1]"></div>
      <div className="w-full h-movie-card">
        <ImageCustom
          src={movieData.poster || ""}
          alt="NO IMAGE"
          imgClassName="w-full h-full object-cover object-top"
          width={200}
          height={400}
        />
      </div>
      <div
        className="
                absolute bottom-0 w-full h-[80px] z-[10] 
                backdrop-blur-[1px] group-hover:backdrop-blur-[8px] shadow-[0_-10px_10px_rgba(0,0,0,0.1)] border border-layout/20
                group-hover:h-[140px] transition-all duration-300 px-3
            "
      >
        <div className="relative h-full space-y-2 flex justify-between flex-col">
          <h4
            className="text-transparent 
            bg-clip-text bg-gradient-to-r from-instagram to-primary text-social-x text-center font-semibold overflow-hidden text-ellipsis line-clamp-3"
          >
            {movieData.title || "-"}
          </h4>
          <div className="absolute flex space-x-1 w-full translate-y-[40px] opacity-0 invisible group-hover:relative group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
            {cardType === MOVIE_NOW_SHOWING ? (
              <Button
                className="
                                w-full translate-x-[-80px] opacity-10
                                group-hover:translate-x-[0] group-hover:opacity-100
                                transition-all duration-300
                            "
                buttonType="info"
                onClick={() => {
                  router.push(
                    `/phim/${MOVIE_NOW_SHOWING}/${movieData.slug}/${movieData.movie_id}`,
                  );
                }}
              >
                Mua vé
              </Button>
            ) : (
              <Button
                className="
                                w-full translate-x-[-80px] opacity-10
                                group-hover:translate-x-[0] group-hover:opacity-100
                                transition-all duration-300
                            "
                buttonType="info"
                onClick={() => {
                  router.push(
                    `/phim/${MOVIE_COMING_SOON}/${movieData.slug}/${movieData.movie_id}`,
                  );
                }}
              >
                Chi tiết
              </Button>
            )}
            <Button
              className="
                        w-full translate-x-[80px] opacity-10
                        group-hover:translate-x-[0] group-hover:opacity-100
                        transition-all duration-300
                    "
              buttonType="error"
              onClick={() => {
                setStateGlobal("isModalViewTrailer", true);
                setStateGlobal("trailerID", movieData.trailer_id);
              }}
            >
              Xem trailler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
