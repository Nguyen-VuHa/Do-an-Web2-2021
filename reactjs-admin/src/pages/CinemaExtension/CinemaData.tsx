import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { apiCreateCinema } from '~/apis/cinema.api';
import Button from '~/components/Button';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import useCinemaStore from '~/stores/cinema.store';
import CinemaDataItem from './CinemaDataItem';

const CinemaData = () => {
  const {
    cinemaCrawlData,
    isProcessCreateMultiCinema,
    cinemaDataProcess,
    setStateCinema,
    setCinemaDataProcess,
  } = useCinemaStore();
  // Tạo ref cho mỗi item trong danh sách
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  useEffect(() => {
    const element = itemRefs.current[selectedItemIndex];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedItemIndex]);

  const handleProcessSaveCinema = async () => {
    setStateCinema('isProcessCreateMultiCinema', true);
    let indexProcess = 0;

    for (const cinema of cinemaCrawlData) {
      // scroll tới item đang xử lý.
      setSelectedItemIndex(indexProcess);
      indexProcess++;

      setCinemaDataProcess({
        title: cinema.cinema_name,
        status: 'loading',
      });

      const res = await apiCreateCinema(cinema);

      if (res.statusCode === STATUS_SUCCESS) {
        setCinemaDataProcess({
          title: cinema.cinema_name,
          status: 'success',
        });
      } else {
        toast.error(res.message);
        setCinemaDataProcess({
          title: cinema.cinema_name,
          status: 'failed',
        });
      }
    }

    setStateCinema('isProcessCreateMultiCinema', false);
  };

  return (
    <div>
      {cinemaCrawlData && cinemaCrawlData.length > 0 && (
        <div className="flex flex-col space-y-3 mb-5 items-center">
          <span className="text-warning text-xl font-semibold">
            Tổng {cinemaCrawlData.length} rạp phim đã sẵn sàng
          </span>
          <Button
            disabled={!(cinemaDataProcess.length <= 0)}
            className="!w-fit"
            loading={isProcessCreateMultiCinema}
            onClick={() => handleProcessSaveCinema()}
          >
            Tạo hàng loạt
          </Button>
        </div>
      )}
      {(cinemaCrawlData &&
        cinemaCrawlData.length > 0 &&
        cinemaCrawlData.map((cinema, index) => {
          const isProcess = cinemaDataProcess.find(
            (cinemaProcess) => cinemaProcess['title'] === cinema.cinema_name,
          );

          return (
            <div
              key={cinema.cinema_name}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <CinemaDataItem
                data={cinema}
                isProcessCreate={isProcessCreateMultiCinema}
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

export default CinemaData;
