import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import CinemaForm from './CinemaForm';
import useCinemaStore from '~/stores/cinema.store';
import cinemaSchema from '~/schemas/cinema.schema';
import { IObject } from '~/types/common.type';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import FindEmbedURLModal from './FindEmbedURL.Modal';

const CinemaEditer = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const {
    cinemaForm,
    isEditCinema,
    addressCrawl,
    isCrawlEmbedURL,
    setStateCinema,
    resetCinemaForm,
    reqCreateCinema,
    reqUpdateCinema,
    reqFetchCinemaDetail,
    reqCrawlEmbedURL,
  } = useCinemaStore();

  useEffect(() => {
    if (slug) {
      const fetchMovieDetail = async () => {
        if (slug) {
          const isFetchDetail = await reqFetchCinemaDetail(slug);

          if (!isFetchDetail) {
            window.location.replace('/404');
          }
        }
      };

      fetchMovieDetail();
    }
  }, []);

  useEffect(() => {
    return () => {
      resetCinemaForm();
    };
  }, []);

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
      if (slug) {
        const isUpdate = await reqUpdateCinema(slug);

        if (isUpdate) {
          toast.success('Cập nhật rạp chiếu phim thành công');
          navigate(-1);
        }
      } else {
        const isCreate = await reqCreateCinema();

        if (isCreate) {
          toast.success('Tạo mới rạp chiếu phim thành công');
          navigate(-1);
        }
      }
    } else {
      toast.error(
        'Một số trường chưa nhập dữ liệu hoặc nhập sai, vui lòng kiểm tra lại',
      );
    }
  };

  return (
    <>
      <FindEmbedURLModal 
        isOpen={isCrawlEmbedURL}
        address={addressCrawl}
      />
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
            {slug ? 'Cập nhật' : 'Tạo mới'} rạp chiếu phim
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className='whitespace-nowrap bg-warning border-warning dark:bg-opacity-50 dark:hover:bg-opacity-20'
            onClick={() => {
              if(!isCrawlEmbedURL) {
                if(cinemaForm.address) {
                  setStateCinema('isCrawlEmbedURL', true);
                  setStateCinema('addressCrawl', cinemaForm.address);
                  reqCrawlEmbedURL(cinemaForm.address);
                } else {
                  toast.error("Vui lòng nhập địa chỉ rạp chiếu trước khi thực hiện tìm kiếm Embed URL")
                }
              }
            }}
            loading={isEditCinema}
          >
            Tìm kiếm Auto Embed URL
          </Button>
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
