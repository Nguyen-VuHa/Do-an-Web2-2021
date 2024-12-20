import useMovieExtensionStore from '~/stores/movie-extension.store';
import MovieDataItem from './MovieDataItem';
import Button from '~/components/Button';

const MovieData = () => {
  const { movieData } = useMovieExtensionStore();

  return (
    <div>
      {movieData && movieData.length > 0 && (
        <div className="flex flex-col space-y-3 mb-5 items-center">
          <span className="text-warning text-xl font-semibold">
            Tổng {movieData.length} phim đã sẵn sàng
          </span>
          <Button className="!w-fit">Tạo hàng loạt</Button>
        </div>
      )}
      {(movieData &&
        movieData.length > 0 &&
        movieData.map((movie) => {
          return <MovieDataItem key={movie.title} data={movie} />;
        })) || <div>Không có dữ liệu.</div>}
    </div>
  );
};

export default MovieData;
