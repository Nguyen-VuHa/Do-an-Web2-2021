import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Tag from '~/components/Tag';
import { ACTIVE } from '~/constants/status';
import useMovieStore from '~/stores/movie.store';

const MovieDetail = () => {
  const navigate = useNavigate();
  const { movie_id } = useParams();
  const { movieDetail, reqFetchMovieDetail, resetFormMovie } = useMovieStore();

  useEffect(() => {
    if (movie_id) {
      const fetchMovieDetail = async () => {
        if (movie_id) {
          const isFetchDetail = await reqFetchMovieDetail(movie_id);

          if (!isFetchDetail) {
            window.location.replace('/404');
          }
        }
      };

      fetchMovieDetail();
    }

    return () => {
      resetFormMovie();
    };
  }, []);

  return (
    <>
      <div className="mb-6 w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowLeft size={22} />
          </Button>
          <h2 className="text-title-md2 whitespace-nowrap font-semibold text-black dark:text-white">
            Thông tin chi tiết phim
          </h2>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="flex justify-between items-end border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            THÔNG TIN PHIM
          </h3>
          <div className="flex text-sm space-x-3">
            <div className="flex items-center space-x-2">
              <span>Hình thức:</span>
              <Tag label={movieDetail?.movie_type || ''} color="warning"></Tag>
            </div>
            <div className="flex  items-center space-x-2">
              <span>Trạng thái:</span>
              <Tag
                label={movieDetail?.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}
                color={movieDetail?.status === ACTIVE ? 'success' : 'danger'}
              />
            </div>
          </div>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Tên Phim"
                  element={
                    <div className="text-lg text-warning">
                      {movieDetail?.title}
                    </div>
                  }
                />
              </div>

              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Thời lượng phim"
                  element={
                    <Tag
                      label={movieDetail?.duration.toString() || ''}
                      color="pink"
                    ></Tag>
                  }
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Ngày khởi chiếu"
                  element={
                    <Tag
                      label={movieDetail?.start_date || ''}
                      color="cyan"
                    ></Tag>
                  }
                />
              </div>

              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Ngày kết thúc"
                  element={
                    <Tag label={movieDetail?.end_date || ''} color="cyan"></Tag>
                  }
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Đạo diễn"
                  element={
                    <Tag
                      label={movieDetail?.director.director_name || ''}
                      color="warning"
                    ></Tag>
                  }
                />
              </div>

              <div className="w-full xl:w-1/2">
                <FormGroup
                  label="Diễn viên"
                  element={
                    <div className="flex flex-wrap gap-1">
                      {movieDetail?.actors.map((actor) => {
                        return (
                          <Tag
                            key={actor.actor_id}
                            label={actor.actor_name || ''}
                            color="warning"
                          ></Tag>
                        );
                      })}
                    </div>
                  }
                />
              </div>
            </div>

            <div className="mb-4.5">
              <FormGroup
                label="Thể loại"
                element={
                  <div className="flex flex-wrap gap-1">
                    {movieDetail?.categories.map((category) => {
                      return (
                        <Tag
                          key={category.category_id}
                          label={category.category_name || ''}
                          color="sky"
                        ></Tag>
                      );
                    })}
                  </div>
                }
              />
            </div>

            <div className="mb-4.5">
              <FormGroup
                label="Mô tả (nếu có)"
                element={
                  <div className="text-md dark:text-white">
                    {movieDetail?.description}
                  </div>
                }
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MovieDetail;
