import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import ButtonIcon from '~/components/ButtonIcon';
import { MdDelete } from 'react-icons/md';
import { CgArrowsExchange } from 'react-icons/cg';
import useCinemaStore from '~/stores/cinema.store';

interface BannerFormProps {
  openMediaSelect?: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ openMediaSelect }) => {
  const { bannerSelect, setStateCinema } = useCinemaStore();
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-4 px-6.5">
        {bannerSelect && (
          <div className="relative w-full h-[350px] overflow-hidden cursor-pointer flex justify-center items-center ">
            <div className="absolute top-[5px] right-[5px] flex space-x-1 rounded-md dark:bg-boxdark bg-stroke p-1">
              <ButtonIcon
                color="success"
                onClick={() => {
                  openMediaSelect && openMediaSelect();
                }}
              >
                <CgArrowsExchange size={22} />
              </ButtonIcon>
              {bannerSelect.cinema_banner_id &&
                bannerSelect.cinema_banner_id <= 0 && (
                  <ButtonIcon
                    color="danger"
                    onClick={() => {
                      setStateCinema('bannerSelect', null);
                    }}
                  >
                    <MdDelete size={22} />
                  </ButtonIcon>
                )}
            </div>
            <img
              src={bannerSelect?.banner_url || ''}
              className="w-fit h-full"
              alt="NO BANNER"
            />
          </div>
        )}
        {!bannerSelect && (
          <div
            className="relative space-y-3 block w-full h-[350px] text-warning flex flex-col justify-center items-center cursor-pointer appearance-none rounded border-2 border-dashed border-warning hover:border-warning/70 py-4 px-4"
            onClick={() => {
              openMediaSelect && openMediaSelect();
            }}
          >
            <MdOutlinePhotoSizeSelectActual size={50} />
            <span>Chọn banner</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerForm;
