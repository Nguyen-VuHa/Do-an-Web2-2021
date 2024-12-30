import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import ShowtimeForm from './ShowtimeForm';

const ShowtimeEditer = () => {
  const navigate = useNavigate();
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
            {'Tạo mới'} suất chiếu
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => {}}>Lưu thay đổi</Button>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4 px-6.5">
        <ShowtimeForm />
      </div>
    </>
  );
};

export default ShowtimeEditer;
