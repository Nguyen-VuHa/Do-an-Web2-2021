import MovieComingSoon from "~/components/pages/HomePage/MovieComingSoon";
import MovieShowing from "~/components/pages/HomePage/MovieShowing";
import Promotion from "~/components/pages/HomePage/Promotion";
import TopWeeklyMovie from "~/components/pages/HomePage/TopWeeklyMovie";

export const metadata = {
  title: "Trang chủ - BHD Star",
};

export default function Home() {
  return (
    <>
      <TopWeeklyMovie />
      <div className="container mx-auto space-y-20">
        <MovieShowing />
        <MovieComingSoon />
        <Promotion />
      </div>
    </>
  );
}
