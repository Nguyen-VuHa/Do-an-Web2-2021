import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import ExtensionControl from './ExtensionControl';
import MovieData from './MovieData';
import CrawlFileModal from './CrawlFile.Modal';
import useMovieExtensionStore from '~/stores/movie-extension.store';
import { useEffect } from 'react';

const MovieExtension = () => {
  const navigate = useNavigate();
  const { isProcessCreateMovie, setDataKeyValue } = useMovieExtensionStore();

  useEffect(() => {
    return () => {
      setDataKeyValue('movieDataProcess', []);
      setDataKeyValue('movieData', []);
      setDataKeyValue('isUploadFileCrawler', false);
      setDataKeyValue('isProcessCrawlFile', false);
      setDataKeyValue('isProcessCreateMovie', false);
    };
  }, []);

  return (
    <>
      {/* Layout process tạo phim hàng loạt */}
      {isProcessCreateMovie && (
        <div className="fixed top-0 left-0 w-full h-full z-[9999999]"></div>
      )}
      <CrawlFileModal />

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
            Tiện ích nhập phim cả rổ
          </h2>
        </div>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <ExtensionControl />
        <MovieData />
      </div>
    </>
  );
};

export default MovieExtension;
