"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbArrowNarrowLeftDashed } from "react-icons/tb";
import Button from "~/components/ui/Button";
import ImageCustom from "~/components/ui/ImageCustom";
import ImageDetail from "~/components/ui/ImageDetail";
import { useGlobalStore } from "~/stores/global.store";
import { IMovieDetail } from "~/types/movie.type";
import DescriptionMovieInfo from "./DescriptionMovieInfo";
import ItemMovieInfo from "./ItemMovieInfo";
import { MovieTypeEnum } from "~/types/common.type";
import { MOVIE_NOW_SHOWING } from "~/constants/movie";

interface TopWeeklyMovieProps {
  movieInfo?: IMovieDetail;
  movieType?: (typeof MovieTypeEnum)[keyof typeof MovieTypeEnum];
}

const MovieInfo: React.FC<TopWeeklyMovieProps> = ({ movieInfo, movieType }) => {
  const [isFetchData] = useState<boolean>(false);
  const router = useRouter();
  const { setStateGlobal } = useGlobalStore();

  return (
    <>
      <section className="relative flex flex-col w-full min-h-screen overflow-hidden">
        <ImageDetail imageURL={movieInfo?.poster || ""} />
        <div
          className="container mx-auto lg:pr-[30%] py-[60px] bg-layout bg-opacity-60 h-full
            w-full space-y-4 md:bg-transparent max-sm:px-8"
        >
          <div className="flex justify-start items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Button
              className="flex-shrink-0 lg:ml-0 flex justify-center items-center !p-0
                  hover:-translate-x-1 transition-all duration-300 animate-back-pulse w-[50px] h-[50px]
                  "
              buttonType="warning"
              onClick={() => {
                router.back();
              }}
            >
              <TbArrowNarrowLeftDashed size={28} />
            </Button>
            <h3
              className="text-3xl font-bold inline-block text-transparent
              bg-clip-text bg-gradient-to-r from-social-x to-youtube border-2 border-transparent
              max-sm:text-2xl "
            >
              {movieInfo?.title}
            </h3>
          </div>
          <div className="flex flex-col w-full md:space-x-4 md:flex-row md:items-start">
            <div className="relative flex justify-center px-20 py-5 bg-transparent overflow-hidden rounded-circle-md shadow-lg shadow-xl md:p-0 max-sm:px-8">
              <ImageCustom
                src={movieInfo?.poster || ""}
                alt="NO POSTER"
                width={300}
                height={400}
                isLoading={isFetchData}
              />
            </div>
            <div className="flex flex-col space-y-10">
              <div className="space-y-4">
                <div className="flex flex-col items-start gap-8">
                  <ItemMovieInfo
                    isLoading={isFetchData}
                    title="Đạo diễn:"
                    content={movieInfo?.director}
                  />
                  <ItemMovieInfo
                    isLoading={isFetchData}
                    title="Diễn viên:"
                    content={movieInfo?.actors}
                  />
                  <ItemMovieInfo
                    isLoading={isFetchData}
                    title="Thể loại:"
                    content={movieInfo?.categories}
                  />
                  <ItemMovieInfo
                    isLoading={isFetchData}
                    title="Khởi chiếu:"
                    content={movieInfo?.start_date}
                  />
                  <ItemMovieInfo
                    isLoading={isFetchData}
                    title="Thời lượng:"
                    content={`${movieInfo?.duration} phút`}
                  />
                  <ItemMovieInfo
                    isLoading={isFetchData}
                    title="Đánh giá:"
                    content="8.9"
                  />
                </div>
              </div>
              <div className="flex space-x-1">
                {movieType === MOVIE_NOW_SHOWING && (
                  <Button className="!px-10" buttonType="info">
                    Đặt vé
                  </Button>
                )}

                <Button
                  className="!px-10"
                  buttonType="error"
                  onClick={() => {
                    setStateGlobal("isModalViewTrailer", true);
                    setStateGlobal("trailerID", movieInfo?.trailer_id);
                  }}
                >
                  Xem Trailer
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-social-x">
            <DescriptionMovieInfo
              content={movieInfo?.description}
              isLoading={isFetchData}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieInfo;
