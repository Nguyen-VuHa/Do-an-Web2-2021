"use client";
import Button from "~/components/ui/Button";
import ImageCustom from "~/components/ui/ImageCustom";
import ImageDetail from "~/components/ui/ImageDetail";
import ItemMovieInfo from "./ItemMovieInfo";
import { useState } from "react";
import DescriptionMovieInfo from "./DescriptionMovieInfo";
import { IMovieInfo } from "~/types/movie.type";
import { useGlobalStore } from "~/stores/global.store";
import { useRouter } from "next/navigation";
import { MOVIE_NOW_SHOWING } from "~/constants/movie";

interface TopWeeklyMovieProps {
  movieInfo?: IMovieInfo;
}

const TopWeeklyMovie: React.FC<TopWeeklyMovieProps> = ({ movieInfo }) => {
  const [isFetchData] = useState<boolean>(false);
  const router = useRouter();
  const { setStateGlobal } = useGlobalStore();

  return (
    <section className="relative flex flex-col w-full min-h-screen overflow-hidden">
      <ImageDetail imageURL={movieInfo?.poster || ""} />
      <div
        className="container mx-auto lg:pr-[30%] py-[60px] bg-layout bg-opacity-60 h-full
            w-full space-y-4 md:bg-transparent max-sm:px-8"
      >
        <h2
          className="text-4xl font-bold inline-block text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-youtube border-2 border-transparent
            max-sm:text-3xl "
        >
          Top Phim Trong Tuần
        </h2>
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
              <h3
                className={`text-primary font-semibold text-2xl ${isFetchData ? "bg-second rounded-circle-md animate-pulse !text-transparent" : ""}`}
              >
                {movieInfo?.title}
              </h3>
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
              <Button
                className="!px-10"
                buttonType="info"
                onClick={() => {
                  router.push(
                    `/phim/${MOVIE_NOW_SHOWING}/${movieInfo?.slug}/${movieInfo?.movie_id}`,
                  );
                }}
              >
                Đặt vé ngay
              </Button>
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
  );
};

export default TopWeeklyMovie;
