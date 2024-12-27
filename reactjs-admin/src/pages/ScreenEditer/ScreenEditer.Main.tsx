import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import ScreenForm from './ScreenForm';
import useScreenStore from '~/stores/screen.store';
import { useEffect } from 'react';
import screenSchema from '~/schemas/screen.schema';
import { IObject } from '~/types/common.type';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { stringToInt } from '~/utils/convert';

const ScreenEditer = () => {
  const { screen_id } = useParams();

  const navigate = useNavigate();
  const {
    isEditScreen,
    screenType,
    cinemaSelect,
    screenForm,
    setStateScreen,
    reqFetchScreenType,
    reqFetchCinemaSelect,
    reqCreateScreen,
    resetScreenForm,
    reqUpdateScreen,
    reqFetchScreenDetail,
  } = useScreenStore();

  useEffect(() => {
    if (screenType.length <= 0) {
      reqFetchScreenType();
    }

    if (cinemaSelect.length <= 0) {
      reqFetchCinemaSelect();
    }

    if (screen_id) {
      const fetchScreenDetail = async () => {
        if (screen_id) {
          const isFetchDetail = await reqFetchScreenDetail(
            stringToInt(screen_id),
          );

          if (!isFetchDetail) {
            window.location.replace('/404');
          }
        }
      };

      fetchScreenDetail();
    }

    return () => {
      resetScreenForm();
    };
  }, []);

  const handleValidateScreenForm = async () => {
    try {
      // Chờ kết quả validate với Yup
      await screenSchema.validate(screenForm, { abortEarly: false });
      setStateScreen('screenFormError', {});
      return true;
    } catch (err: any) {
      const errors: IObject<string> = {};

      err.inner.map((error: Yup.ValidationError) => {
        errors[error.path as string] = error.message;
      });

      setStateScreen('screenFormError', errors);
      return false;
    }
  };

  const handleSubmitEditScreen = async () => {
    const isValidData = await handleValidateScreenForm();

    if (isValidData) {
      if (screen_id) {
        const isUpdate = await reqUpdateScreen(stringToInt(screen_id));

        if (isUpdate) navigate(-1);
        return;
      }

      const isCreate = await reqCreateScreen();

      if (isCreate) navigate(-1);
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
              navigate(-1);
            }}
          >
            <FaArrowLeft size={22} />
          </Button>
          <h2 className="text-title-md2 whitespace-nowrap font-semibold text-black dark:text-white">
            {screen_id ? 'Cập nhật' : 'Tạo mới'} phòng chiếu
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              handleSubmitEditScreen();
            }}
            loading={isEditScreen}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4 px-6.5">
        <ScreenForm />
      </div>
    </>
  );
};

export default ScreenEditer;
