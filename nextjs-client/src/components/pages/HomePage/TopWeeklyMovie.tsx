"use client";
import Button from "~/components/ui/Button";
import ImageCustom from "~/components/ui/ImageCustom";
import ImageDetail from "~/components/ui/ImageDetail";
import ItemMovieInfo from "./ItemMovieInfo";
import { useEffect, useState } from "react";
import DescriptionMovieInfo from "./DescriptionMovieInfo";

const TopWeeklyMovie = () => {
  const [isFetchData, setIsFetchData] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFetchData(false);
    }, 1000);
  }, []);

  return (
    <section className="relative flex flex-col w-full min-h-screen overflow-hidden">
      <ImageDetail imageURL="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-20.jpg" />
      <div
        className="container mx-auto lg:pr-[30%] py-[60px] bg-layout bg-opacity-60 h-full
            w-full space-y-4 md:bg-transparent"
      >
        <h2
          className="text-4xl font-bold inline-block text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-youtube border-2 border-transparent
            "
        >
          Top Phim Trong Tuần
        </h2>
        <div className="flex flex-col w-full md:space-x-4 md:flex-row md:items-start">
          <div className="relative flex justify-center px-20 py-5 bg-transparent overflow-hidden rounded-circle-md shadow-lg shadow-xl md:p-0 md:w-[300px]">
            <ImageCustom
              src="https://bhdstar.vn/wp-content/uploads/2024/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-20.jpg"
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
                THE SUPER ELFKINS: BIỆT ĐỘI TÍ HON
              </h3>
              <div className="flex flex-col items-start gap-8">
                <ItemMovieInfo
                  isLoading={isFetchData}
                  title="Đạo diễn:"
                  content="Ute von Münchow-Pohl"
                />
                <ItemMovieInfo
                  isLoading={isFetchData}
                  title="Diễn viên:"
                  content="Hilde Dalik, Dave Davis"
                />
                <ItemMovieInfo
                  isLoading={isFetchData}
                  title="Thể loại:"
                  content="Family"
                />
                <ItemMovieInfo
                  isLoading={isFetchData}
                  title="Khởi chiếu:"
                  content="24/12/2024"
                />
                <ItemMovieInfo
                  isLoading={isFetchData}
                  title="Thời lượng:"
                  content="76 phút"
                />
                <ItemMovieInfo
                  isLoading={isFetchData}
                  title="Đánh giá:"
                  content="8.9"
                />
              </div>
            </div>
            <div className="flex space-x-1">
              <Button className="!px-10" buttonType="info">
                Đặt vé
              </Button>
              <Button className="!px-10" buttonType="error">
                Xem Trailer
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-social-x">
          <DescriptionMovieInfo
            content={`Dựa trên bộ phim "The Elfkins – Baking A Difference". Thế giới của
            Elfie bị đảo lộn khi cô phát hiện ra sự tồn tại của một băng đảng
            Elfkin tiên tiến về mặt kỹ thuật, trái ngược hoàn toàn với gia tộc
            của Elfie không ai sánh bằng bởi sự vui vẻ.`}
            isLoading={isFetchData}
          />
        </div>
      </div>
    </section>
  );
};

export default TopWeeklyMovie;
