import React from 'react';
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import { IoMdAdd } from 'react-icons/io';
import DatePicker from '~/components/DatePicker';
import { IoSearchOutline } from 'react-icons/io5';
import MovieList from './MovieList';
import { useNavigate } from 'react-router-dom';

const MovieManagement = () => {
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb pageName="Quản lý phim" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-auto flex items-center space-x-2">
              <label className="block text-black dark:text-white">
                Từ ngày
              </label>
              <div className="relative">
                <DatePicker />
              </div>
            </div>
            <div className="w-auto flex items-center space-x-2">
              <label className="block text-black dark:text-white">
                Đến ngày
              </label>
              <div className="relative">
                <DatePicker />
              </div>
            </div>
          </div>
          <div className="flex space-x-2 w-auto">
            <Button>
              <span className="whitespace-nowrap">Lọc dữ liệu</span>
              <IoSearchOutline size={20} />
            </Button>
            <Button
              onClick={() => {
                navigate('/movies/create');
              }}
            >
              <span>Thêm mới</span>
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
