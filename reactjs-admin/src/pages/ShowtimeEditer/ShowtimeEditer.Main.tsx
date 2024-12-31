import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import ShowtimeForm from './ShowtimeForm';
import { useEffect } from 'react';
import useScreenStore from '~/stores/screen.store';
import useMovieStore from '~/stores/movie.store';
import useShowtimeStore from '~/stores/showtime.store';
import showtimeSchema from '~/schemas/showtime.schema';
import { IObject } from '~/types/common.type';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const ShowtimeEditer = () => {
  const navigate = useNavigate();
  const { cinemaSelect, reqFetchCinemaSelect } = useScreenStore();
  const { movieSelection, reqFetchMovieSelection } = useMovieStore();
  const {
    showtimeForm,
    cinemaSelected,
    isEditShowtime,
    setStateShowtime,
    resetShowtimeForm,
    reqCreateShowtime,
  } = useShowtimeStore();

  useEffect(() => {
    if (cinemaSelect.length <= 0) {
      reqFetchCinemaSelect();
    }

    if (movieSelection.length <= 0) {
      reqFetchMovieSelection();
    }

    return () => {
      resetShowtimeForm();
    };
  }, []);

  const handleValidateShowtimeForm = async () => {
    try {
      // Chờ kết quả validate với Yup
      await showtimeSchema.validate(
        { ...showtimeForm, cinema: cinemaSelected },
        { abortEarly: false },
      );
      setStateShowtime('showtimeFormError', {});
      return true;
    } catch (err: any) {
      const errors: IObject<string> = {};

      err.inner.map((error: Yup.ValidationError) => {
        errors[error.path as string] = error.message;
      });

      setStateShowtime('showtimeFormError', errors);
      return false;
    }
  };

  const handleSubmitEditShowtime = async () => {
    const isValidData = await handleValidateShowtimeForm();

    if (isValidData) {
      const isCreated = await reqCreateShowtime();

      if (isCreated) {
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
              if (!isEditShowtime) navigate(-1);
            }}
          >
            <FaArrowLeft size={22} />
          </Button>
          <h2 className="text-title-md2 whitespace-nowrap font-semibold text-black dark:text-white">
            {'Tạo mới'} suất chiếu
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              if (!isEditShowtime) handleSubmitEditShowtime();
            }}
            loading={isEditShowtime}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4 px-6.5">
        <ShowtimeForm />
      </div>
    </>
  );
};

export default ShowtimeEditer;
