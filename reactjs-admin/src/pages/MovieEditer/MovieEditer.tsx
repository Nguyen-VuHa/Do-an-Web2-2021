import Button from '~/components/Button';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import MovieForm from './MovieForm';
import CategoryForm from './CategoryForm';
import DirectorForm from './DirectorForm';
import ActorForm from './ActorForm';
import useCategoryStore from '~/stores/category.store';
import { useEffect } from 'react';

const MovieEditer = () => {
  const navigate = useNavigate();
  const { movie_id } = useParams();

  const { reqFetchAllCategories } = useCategoryStore();

  // component mounting -> fetch data
  useEffect(() => {
    reqFetchAllCategories();
  }, []);

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
            {movie_id ? 'Cập nhật phim' : 'Tạo mới phim'}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Lưu thay đổi</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
