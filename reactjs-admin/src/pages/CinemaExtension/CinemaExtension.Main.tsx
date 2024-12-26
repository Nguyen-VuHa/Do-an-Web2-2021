import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import ExtensionControl from './ExtensionControl';
import ConfirmCrawlDataModal from './ConfirmCrawlData.Modal';
import CrawlCinemaDetail from './CrawlCinemaDetail.Modal';
import useCinemaStore from '~/stores/cinema.store';
import CinemaData from './CinemaData';
import { useEffect } from 'react';

const CinemaExtension = () => {
  const navigate = useNavigate();
  const { isCrawlCinemaDetail, isProcessCreateMultiCinema, setStateCinema } =
    useCinemaStore();

  useEffect(() => {
    return () => {
      setStateCinema('cinemaCrawlData', []);
    };
  }, []);
  return (
    <>
      {isProcessCreateMultiCinema && (
        <div className="fixed top-0 left-0 w-full h-full z-[9999999]"></div>
      )}
      <ConfirmCrawlDataModal />

      <CrawlCinemaDetail isOpen={isCrawlCinemaDetail} />
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
            Tiện ích nhập rạp chiếu phim cả rổ
          </h2>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <ExtensionControl />
        <CinemaData />
      </div>
    </>
  );
};

export default CinemaExtension;
