import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { apiURLtoBase64 } from '~/apis/crawler.api';
import { apiUploadFileToCloud } from '~/apis/file-system.api';
import { apiCheckingMovieName, apiSmartCreateMovie } from '~/apis/movie.api';
import Button from '~/components/Button';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import useMovieExtensionStore from '~/stores/movie-extension.store';
import { IObject } from '~/types/common.type';
import { base64ToFileWithMime, stringToInt } from '~/utils/convert';
import MovieDataItem from './MovieDataItem';

const MovieData = () => {
  const { movieData } = useMovieExtensionStore();
  // Tạo ref cho mỗi item trong danh sách
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const {
    isProcessCreateMovie,
    movieDataProcess,
    setDataKeyValue,
    setMovieDataProcess,
  } = useMovieExtensionStore();

  const handleProcessSaveMovie = async () => {
    setDataKeyValue('isProcessCreateMovie', true);
    let indexProcess = 0;

    for (const movie of movieData) {
      // scroll tới item đang xử lý.
      setSelectedItemIndex(indexProcess);
      indexProcess++;

      // push item vào để hiển thị loading cho item đó
      setMovieDataProcess({
        title: movie.title,
        status: 'loading',
      });

      const resChecking = await apiCheckingMovieName({
        _movie_name: movie.title,
      });

      if (
        (resChecking.statusCode === STATUS_SUCCESS && resChecking.data) ||
        resChecking.error
      ) {
        setMovieDataProcess({
          title: movie.title,
          status: 'failed',
        });
        continue;
      }
      // tạo object movie
      const movieData: IObject<any> = {
        title: movie.title,
        duration: stringToInt(movie.duration),
        start_date: movie.start_date,
        end_date: movie.end_date,
        trailer_id: movie.trailer_id,
        description: movie.description,
        director: movie.director,
        categories:
          (movie.categories &&
            movie.categories.split(',').map((category) => category.trim())) ||
          [],
        actors:
          (movie.actors &&
            movie.actors.split(',').map((category) => category.trim())) ||
          [],
      };

      for (const poster of movie.poster_url) {
        // convert từ URL crawl data -> chuyển sang base64 -> convert về File
        const resImage = await apiURLtoBase64({
          _url: poster,
        });
        const posterList: string[] = [];
        if (resImage.error === '' && resImage.data) {
          const fileConvert = base64ToFileWithMime(resImage.data, movie.title);
          const payloadFile = new FormData();
          payloadFile.append('file', fileConvert);
          // đẩy file lên hệ thống và lấy URL để lưu POSTER
          const res = await apiUploadFileToCloud(payloadFile);
          if (res.statusCode === 200 && res.data) {
            posterList.push(res.data || '');
          }
        }
        movieData['posters'] = posterList;
      }

      const res = await apiSmartCreateMovie(movieData);

      if (res.statusCode === STATUS_SUCCESS) {
        setMovieDataProcess({
          title: movie.title,
          status: 'success',
        });
      } else {
        toast.error(res.message);
        setMovieDataProcess({
          title: movie.title,
          status: 'failed',
        });
      }
    }

    setDataKeyValue('isProcessCreateMovie', false);
  };

  useEffect(() => {
    const element = itemRefs.current[selectedItemIndex];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedItemIndex]);

  return (
    <div>
      {movieData && movieData.length > 0 && (
        <div className="flex flex-col space-y-3 mb-5 items-center">
          <span className="text-warning text-xl font-semibold">
            Tổng {movieData.length} phim đã sẵn sàng
          </span>
          <Button
            disabled={!(movieDataProcess.length <= 0)}
            className="!w-fit"
            onClick={() => handleProcessSaveMovie()}
            loading={isProcessCreateMovie}
          >
            Tạo hàng loạt
          </Button>
        </div>
      )}
      {(movieData &&
        movieData.length > 0 &&
        movieData.map((movie, index) => {
          const isProcess = movieDataProcess.find(
            (movieProcess) => movieProcess['title'] === movie.title,
          );

          return (
            <div key={movie.title} ref={(el) => (itemRefs.current[index] = el)}>
              <MovieDataItem
                data={movie}
                isProcessCreate={isProcessCreateMovie}
                isProcessCompleted={isProcess && isProcess['status']}
                isProcessLoading={
                  isProcess && isProcess['status'] === 'loading'
                }
              />
            </div>
          );
        })) || <div>Không có dữ liệu.</div>}
    </div>
  );
};

export default MovieData;
