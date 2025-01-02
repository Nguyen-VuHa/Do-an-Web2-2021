import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import ExtensionControl from './ExtensionControl';
import ShowtimeData from './ShowtimeData';
import useShowtimeExtensionStore from '~/stores/showtime-extension';
import { useEffect } from 'react';

const ShowtimeExtension = () => {
  const navigate = useNavigate();

  const { resetShowtimeExtension } = useShowtimeExtensionStore();

  useEffect(() => {
    return () => {
      resetShowtimeExtension();
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
            Tiện ích tạo suất chiếu theo BHD
          </h2>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <ExtensionControl />
        <ShowtimeData />
      </div>
    </>
  );
};

export default ShowtimeExtension;
