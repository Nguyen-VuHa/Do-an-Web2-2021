import toast from 'react-hot-toast';
import { GiCloudDownload, GiCloudUpload } from 'react-icons/gi';
import Button from '~/components/Button';
import Input from '~/components/Input';
import useMovieExtensionStore from '~/stores/movie-extension.store';

const ExtensionControl = () => {
  const {
    urlCrawler,
    isCrawlData,
    isProcessCreateMovie,
    setDataKeyValue,
    reqCrawlMovieDetail,
  } = useMovieExtensionStore();

  const handleCrawlerDataWithURL = () => {
    if (!urlCrawler) {
      toast.error('Vui lòng nhập URL thu thập dữ liệu.');
      return;
    }

    if (isProcessCreateMovie) return;

    reqCrawlMovieDetail();
  };

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-warning text-sm">
        Chỉ support domain (BHD, CGV) vui lòng nhập các URL đúng với 2 rạp trên.
      </span>
      <div className="flex flex-col-reverse md:flex-row md:space-x-2">
        <Input
          className="w-fit mt-2 md:mt-0"
          placeholder="Nhập URL thu thập dữ liệu"
          value={urlCrawler}
          onChange={(e) => {
            setDataKeyValue('urlCrawler', e.target.value);
          }}
        />
        <div className="flex space-x-2">
          <Button
            className="!w-fit whitespace-nowrap border-none space-x-2 bg-violet dark:bg-opacity-50 dark:hover:bg-opacity-20"
            onClick={() => {
              if (!isCrawlData) handleCrawlerDataWithURL();
            }}
            loading={isCrawlData}
            disabled={isProcessCreateMovie}
          >
            <span>Thu thập dữ liệu</span>
            <GiCloudDownload size={20} />
          </Button>
          <Button
            className="!w-fit whitespace-nowrap border-none space-x-2 bg-sky dark:bg-opacity-50 dark:hover:bg-opacity-20"
            loading={isCrawlData}
            onClick={() => {
              if (!isCrawlData) setDataKeyValue('isUploadFileCrawler', true);
            }}
            disabled={isProcessCreateMovie}
          >
            <span>Tải lên tệp tin</span>
            <GiCloudUpload size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionControl;
