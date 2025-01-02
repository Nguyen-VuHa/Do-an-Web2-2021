import toast from 'react-hot-toast';
import { GiCloudDownload } from 'react-icons/gi';
import Button from '~/components/Button';
import Input from '~/components/Input';
import useShowtimeExtensionStore from '~/stores/showtime-extension';

const ExtensionControl = () => {
  const {
    urlCrawler,
    isCrawlData,
    reqCrawlShowtimeData,
    setStateShowtimeExtension,
  } = useShowtimeExtensionStore();

  const handleCrawlShowtime = async () => {
    if (!urlCrawler) {
      toast.error('Vui lòng nhập URL thu thập dữ liệu.');
      return;
    }

    if (isCrawlData) return;

    reqCrawlShowtimeData();
  };
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-warning text-sm">
        Chỉ support domain (BHD) vui lòng nhập các URL đúng với 2 rạp trên.
      </span>
      <div className="flex flex-col-reverse md:flex-row md:space-x-2">
        <Input
          className="w-fit mt-2 md:mt-0"
          placeholder="Nhập URL thu thập dữ liệu"
          value={urlCrawler}
          onChange={(e) => {
            setStateShowtimeExtension('urlCrawler', e.target.value);
          }}
        />
        <div className="flex space-x-2">
          <Button
            className="!w-fit whitespace-nowrap border-none space-x-2 bg-violet dark:bg-opacity-50 dark:hover:bg-opacity-20"
            onClick={() => {
              handleCrawlShowtime();
            }}
            loading={isCrawlData}
          >
            <span>Thu thập dữ liệu</span>
            <GiCloudDownload size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionControl;
