import useMovieExtensionStore from '~/stores/movie-extension.store';
import MovieDataItem from './MovieDataItem';
import Button from '~/components/Button';
import { apiURLtoBase64 } from '~/apis/crawler.api';
import { base64ToFileWithMime, stringToInt } from '~/utils/convert';
import { apiUploadFileSystem } from '~/apis/file-system.api';
import { IObject } from '~/types/common.type';

const MovieData = () => {
  const { movieData } = useMovieExtensionStore();


  const handleProcessSaveMovie = async () => {
    for (const movie of movieData) {
      const movieData: IObject<any> = {
        title: movie.title,
        duration: stringToInt(movie.duration),
        start_date: movie.start_date,
        end_date: movie.end_date,
        trailer_id: movie.trailer_id,
        description: movie.description,
        director: movie.director,
        categories: movie.categories.split(',').map(category => category.trim()),
        actors: movie.actors.split(',').map(category => category.trim()),
      }
      for (const poster of movie.poster_url) {
        // convert từ URL crawl data -> chuyển sang base64 -> convert về File
        const resImage = await apiURLtoBase64({
          _url: poster,
        })

        const posterList: string[] = [];
        if(resImage.error === "" && resImage.data) {
          const fileConvert = base64ToFileWithMime(resImage.data, movie.title);

          const payloadFile = new FormData()

          payloadFile.append('file', fileConvert)
          payloadFile.append('type', 'file')
          // đẩy file lên hệ thống và lấy URL để lưu POSTER
          const res = await apiUploadFileSystem(payloadFile)

          if(res.statusCode === 200 && res.data) {
            posterList.push(res.data.path || '')
          }
        }

        movieData["posters"] = posterList;
      }

      console.log(movieData);
    }
  }

  return (
    <div>
      {movieData && movieData.length > 0 && (
        <div className="flex flex-col space-y-3 mb-5 items-center">
          <span className="text-warning text-xl font-semibold">
            Tổng {movieData.length} phim đã sẵn sàng
          </span>
          <Button 
            className="!w-fit"
            onClick={() => handleProcessSaveMovie()}
          >Tạo hàng loạt</Button>
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
