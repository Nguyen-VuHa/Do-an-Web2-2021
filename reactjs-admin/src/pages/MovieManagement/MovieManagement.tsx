import { useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';
import useMovieStore from '~/stores/movie.store';
import ComfirmUpdateStatusModal from './ComfirmUpdateStatus.Modal';
import MovieList from './MovieList';

const MovieManagement = () => {
  const navigate = useNavigate();
  const {
    isFetchMovieList,
    movieCondition,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    reqFetchMovieList,
  } = useMovieStore();

  useEffect(() => {
    reqFetchMovieList({
      ...movieCondition,
      _start_date: startDate,
      _end_date: endDate,
    });
  }, []);

  return (
    <>
      <Breadcrumb pageName="Quản lý phim" />

      <ComfirmUpdateStatusModal />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-auto flex items-center space-x-2">
              <label className="block text-black dark:text-white">
                Từ ngày
              </label>
              <div className="relative">
                <DatePicker
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-auto flex items-center space-x-2">
              <label className="block text-black dark:text-white">
                Đến ngày
              </label>
              <div className="relative">
                <DatePicker
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-2 w-auto">
            <Button
              loading={isFetchMovieList}
              onClick={() => {
                reqFetchMovieList({
                  ...movieCondition,
                  _start_date: startDate,
                  _end_date: endDate,
                });
              }}
            >
              <span className="whitespace-nowrap">Lọc dữ liệu</span>
              <IoSearchOutline size={20} />
            </Button>
            <Button
              onClick={() => {
                navigate('/movies/create');
              }}
            >
              <span className="whitespace-nowrap">Thêm mới</span>
              <IoMdAdd size={20} />
            </Button>
          </div>
        </div>
        <MovieList />
      </div>
    </>
  );
};

export default MovieManagement;
