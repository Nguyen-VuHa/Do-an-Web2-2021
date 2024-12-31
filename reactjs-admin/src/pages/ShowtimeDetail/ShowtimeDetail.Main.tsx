import dayjs from 'dayjs';
import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Tag from '~/components/Tag';
import useShowtimeStore from '~/stores/showtime.store';

const ShowtimeDetail = () => {
  const navigate = useNavigate();
  const { showtime_id } = useParams();
  const { showtimeDetail, resetShowtimeForm, reqFetchShowtimeDetail } =
    useShowtimeStore();

  useEffect(() => {
    if (showtime_id) {
      const fetchShowtimeDetail = async () => {
        if (showtime_id) {
          const isFetchDetail = await reqFetchShowtimeDetail(showtime_id);

          if (!isFetchDetail) {
            window.location.replace('/404');
          }
        }
      };

      fetchShowtimeDetail();
    }

    return () => {
      resetShowtimeForm();
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
            Thông tin suất chiếu
          </h2>
        </div>
      </div>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="flex justify-between items-end border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            THÔNG TIN SUẤT CHIẾU
          </h3>
        </div>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormGroup
                label="Mã Code"
                element={
                  <div className="text-lg text-warning">
                    {showtimeDetail?.showtime_id || '-'}
                  </div>
                }
              />
            </div>

            <div className="w-full xl:w-1/2">
              <FormGroup
                label="Thời gian chiếu"
                element={
                  <Tag
                    label={
                      (showtimeDetail?.start_time &&
                        `(${dayjs(showtimeDetail.start_time).format(
                          'HH:mm',
                        )} ~ ${dayjs(showtimeDetail.end_time).format(
                          'HH:mm',
                        )}) - ${dayjs(showtimeDetail.start_time).format(
                          'DD/MM/YYYY',
                        )}`) ||
                      '-'
                    }
                    color="warning"
                  />
                }
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormGroup
                label="Rạp chiếu - Phòng chiếu"
                element={
                  <div className="flex space-x-2">
                    <Tag
                      label={showtimeDetail?.cinema.cinema_name || ''}
                      color="success"
                    />
                    <Tag
                      label={showtimeDetail?.screen.screen_name || ''}
                      color="warning"
                    />
                  </div>
                }
              />
            </div>

            <div className="w-full xl:w-1/2">
              <FormGroup
                label="Đơn giá (VNĐ)"
                element={
                  <div className="text-lg text-warning">
                    <Tag
                      label={`${
                        showtimeDetail?.unit_price?.toLocaleString() || '0'
                      } đ`}
                      color="sky"
                    />
                  </div>
                }
              />
            </div>
          </div>
          <div className="mb-4.5">
            <FormGroup
              label="Phim chiếu trong suất chiếu"
              element={
                <div className="text-lg text-warning">
                  {showtimeDetail?.movie.title || '-'}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowtimeDetail;
