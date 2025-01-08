import { notFound } from "next/navigation";
import { apiFetchMovieDetail } from "~/apis/movie.api";
import MovieInfo from "~/components/pages/MovieDetail/MovieInfo";
import { MOVIE_COMING_SOON, MOVIE_NOW_SHOWING } from "~/constants/movie";
import { STATUS_SUCCESS } from "~/constants/status";

export async function generateMetadata({ params }) {
  const { movie_id } = params;

  const { data } = await apiFetchMovieDetail(movie_id);

  // Dữ liệu động cho metadata
  const title = `${data?.title} - BHD Star`;

  return {
    title, // Set title
  };
}

const MovieDetailMain = async ({ params }) => {
  try {
    const { status, movie_id } = params;

    if (status !== MOVIE_COMING_SOON && status !== MOVIE_NOW_SHOWING) {
      notFound(); // Điều hướng tới trang 404
    }

    const movie = await apiFetchMovieDetail(movie_id);

    if (movie.statusCode != STATUS_SUCCESS || !movie.data) {
      notFound(); // Điều hướng tới trang 404
    }

    return (
      <>
        <MovieInfo movieInfo={movie.data} movieType={status} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    notFound();
  }
};

export default MovieDetailMain;
