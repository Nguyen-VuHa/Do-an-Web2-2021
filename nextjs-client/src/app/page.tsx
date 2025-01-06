import { apiFetchMovies, apiFetchMovieTopWeek } from "~/apis/movie.api";
import ViewTrailer from "~/components/common/ViewTrailer";
import MovieComingSoon from "~/components/pages/HomePage/MovieComingSoon";
import MovieShowing from "~/components/pages/HomePage/MovieShowing";
import Promotion from "~/components/pages/HomePage/Promotion";
import TopWeeklyMovie from "~/components/pages/HomePage/TopWeeklyMovie";

export const metadata = {
  title: "Trang chủ - BHD Star",
};

export default async function Home() {
  const resMovieTopWeek = await apiFetchMovieTopWeek();
  const resMovie = await apiFetchMovies();

  return (
    <>
      <ViewTrailer />
      <TopWeeklyMovie movieInfo={resMovieTopWeek.data} />
      <div className="container mx-auto space-y-20">
        <MovieShowing movieShowing={resMovie.data?.showing} />
        <MovieComingSoon movieComingSoon={resMovie.data?.comming_soon} />
        <Promotion />
      </div>
    </>
  );
}
