import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button';
import movieSchema from '~/schemas/movie.schema';
import useActorStore from '~/stores/actor.store';
import useCategoryStore from '~/stores/category.store';
import useDirectorStore from '~/stores/director.store';
import useMovieStore from '~/stores/movie.store';
import { IObject } from '~/types/common.type';
import ActorForm from './ActorForm';
import CategoryForm from './CategoryForm';
import DirectorForm from './DirectorForm';
import MovieForm from './MovieForm';
import PosterForm from './PosterForm';
import MediaSelect from '~/components/MediaSelect/MediaSelect.Main';

const MovieEditer = () => {
  const navigate = useNavigate();
  const { movie_id } = useParams();

  const { reqFetchAllCategories } = useCategoryStore();
  const { reqFetchAllDirectors } = useDirectorStore();
  const { reqFetchAllActor } = useActorStore();
  const {
    posterUpdate,
    movieForm,
    directorSelected,
    categoriesSelected,
    actorSelected,
    isEditMovie,
    setErrorMovieForm,
    setDataKeyValue,
    reqCreateMovie,
    reqUpdateMovie,
    resetFormMovie,
    reqFetchMovieDetail,
    posterSelected,
  } = useMovieStore();

  const [isModalMedia, setIsModalMedia] = useState<boolean>(false);

  useEffect(() => {
    if (movie_id) {
      const fetchMovieDetail = async () => {
        if (movie_id) {
          const isFetchDetail = await reqFetchMovieDetail(movie_id);

          if (!isFetchDetail) {
            window.location.replace('/404');
          }
        }
      };

      fetchMovieDetail();
    }
  }, []);

  // component mounting -> fetch data
  useEffect(() => {
    reqFetchAllCategories();
    reqFetchAllDirectors();
    reqFetchAllActor();

    return () => {
      resetFormMovie();
    };
  }, []);

  const handleValidateMovieForm = async () => {
    try {
      // Chờ kết quả validate với Yup
      await movieSchema.validate(
        {
          ...movieForm,
          director: directorSelected,
          actors: actorSelected,
          categories: categoriesSelected,
        },
        { abortEarly: false },
      );
      return true;
    } catch (err: any) {
      const errors: IObject<string> = {};

      err.inner.map((error: Yup.ValidationError) => {
        errors[error.path as string] = error.message;
      });

      setErrorMovieForm(errors);
      return false;
    }
  };

  const handleSubmitEditMovie = async () => {
    const isValidData = await handleValidateMovieForm();

    if (isValidData) {
      if (movie_id) {
        const statusUpdate = await reqUpdateMovie(movie_id);

        if (statusUpdate) {
          toast.success('Cập nhật phim thành công');
          navigate(-1);
        }
      } else {
        const statusCreate = await reqCreateMovie();

        if (statusCreate) {
          toast.success('Tạo mới phim thành công');
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
      <MediaSelect
        isOpen={isModalMedia}
        onClose={() => {
          setIsModalMedia(false);
          setDataKeyValue('posterUpdate', null);
        }}
        onSingleSelect={(data) => {
          if (posterUpdate) {
            setDataKeyValue(
              'posterSelected',
              posterSelected.map((poster) =>
                poster.movie_poster_id === posterUpdate.movie_poster_id
                  ? { ...poster, poster_url: data.path }
                  : poster,
              ),
            );
            setDataKeyValue('posterUpdate', null);
          } else {
            setDataKeyValue('posterSelected', [
              ...posterSelected,
              {
                movie_poster_id:
                  posterSelected.length + 1 + Math.floor(Date.now() / 1000),
                poster_url: data.path,
                type: 'create',
              },
            ]);
          }

          setIsModalMedia(false);
        }}
      />
      <div className="mb-6 w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              if (!isEditMovie) navigate(-1);
            }}
          >
            <FaArrowLeft size={22} />
          </Button>
          <h2 className="text-title-md2 whitespace-nowrap font-semibold text-black dark:text-white">
            {movie_id ? 'Cập nhật phim' : 'Tạo mới phim'}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button loading={isEditMovie} onClick={() => handleSubmitEditMovie()}>
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <PosterForm
        openMediaSelect={() => {
          setIsModalMedia(true);
        }}
      />
      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
        <MovieForm />
        <div className="flex flex-col gap-5">
          <CategoryForm />
          <DirectorForm />
          <ActorForm />
        </div>
      </div>
    </>
  );
};

export default MovieEditer;
