import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import CinemaForm from './CinemaForm';
import useCinemaStore from '~/stores/cinema.store';
import cinemaSchema from '~/schemas/cinema.schema';
import { IObject } from '~/types/common.type';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const CinemaEditer = () => {
  const navigate = useNavigate();

  const { cinemaForm, isEditCinema, setStateCinema, resetCinemaForm,  reqCreateCinema } = useCinemaStore();

  useEffect(() => {
    return () => {
        resetCinemaForm();
    }
  }, [])
  

  const handleValidateCinemaForm = async () => {
    try {
      // Chờ kết quả validate với Yup
      await cinemaSchema.validate(cinemaForm, { abortEarly: false });
      setStateCinema('cinemaFormError', {});
      return true;
    } catch (err: any) {
      const errors: IObject<string> = {};

      err.inner.map((error: Yup.ValidationError) => {
        errors[error.path as string] = error.message;
      });

      setStateCinema('cinemaFormError', errors);
      return false;
    }
  };

  const handleSubmitEditCinema = async () => {
    const isValidData = await handleValidateCinemaForm();

    if (isValidData) {
        const isCreate = await reqCreateCinema();

        if(isCreate) {
            navigate(-1);
        }
    } else {
      toast.error(
        'Một số trường chưa nhập dữ liệu hoặc nhập sai, vui lòng kiểm tra lại',
      );
    }
  };

  return (
    <>
      <div className="mb-6 w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              if (!isEditCinema) navigate(-1);
            }}
          >
            <FaArrowLeft size={22} />
          </Button>
          <h2 className="text-title-md2 whitespace-nowrap font-semibold text-black dark:text-white">
            Tạo mới rạp chiếu phim
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              if (!isEditCinema) handleSubmitEditCinema();
            }}
            loading={isEditCinema}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
      <CinemaForm />
    </>
  );
};

export default CinemaEditer;
