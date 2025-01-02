import useShowtimeExtensionStore from '~/stores/showtime-extension';
import ShowtimeDataItem from './ShowtimeDataItem';
import Button from '~/components/Button';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import toast from 'react-hot-toast';
import { apiSmartCreateShowtime } from '~/apis/showtime.api';
import { useNavigate } from 'react-router-dom';

const ShowtimeData = () => {
  const navigate = useNavigate();
  const { showtimeData, isProcessCreateShowtime, setStateShowtimeExtension } =
    useShowtimeExtensionStore();

  const handleProcessSaveShowtime = async () => {
    setStateShowtimeExtension('isProcessCreateShowtime', true);

    for (const showtime of showtimeData) {
      const res = await apiSmartCreateShowtime(showtime);

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }

    setStateShowtimeExtension('isProcessCreateShowtime', false);

    navigate(-1);
  };
  return (
    <div>
      {showtimeData && showtimeData.length > 0 && (
        <div className="flex flex-col space-y-3 mb-5 items-center">
          <span className="text-warning text-xl font-semibold">
            Tổng {showtimeData.length} phim có dữ liệu suất chiếu đã sẵn sàng
          </span>
          <Button
            className="!w-fit"
            loading={isProcessCreateShowtime}
            onClick={() => {
              handleProcessSaveShowtime();
            }}
          >
            Tạo hàng loạt
          </Button>
        </div>
      )}
      {(showtimeData &&
        showtimeData.length > 0 &&
        showtimeData.map((showtime) => {
          return (
            <div key={showtime.movie}>
              <ShowtimeDataItem data={showtime} />
            </div>
          );
        })) || <div>Không có dữ liệu.</div>}
    </div>
  );
};

export default ShowtimeData;
