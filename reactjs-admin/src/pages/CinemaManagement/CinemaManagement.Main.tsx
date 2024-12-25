import { useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { TbDatabaseImport } from 'react-icons/tb';
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import InputSearch from '~/components/InputSearch/InputSearch.Main';
import useCinemaStore from '~/stores/cinema.store';
import CinemaList from './CinemaList';
import { useNavigate } from 'react-router-dom';

const CinemaManagement = () => {
  const navigate = useNavigate();
  const {
    isFetchCinemaList,
    queryOptions,
    setStateCinema,
    reqFetchCinemaList,
  } = useCinemaStore();

  useEffect(() => {
    reqFetchCinemaList();
  }, [queryOptions._search, queryOptions._page, queryOptions._page_size]);

  return (
    <>
      <Breadcrumb pageName="Quản lý hệ thống rạp" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="w-full flex justify-between items-center">
          <div className="w-[50%]">
            <InputSearch
              placeholder="Nhập tên rạp chiếu cần tìm ..."
              loading={isFetchCinemaList}
              value={queryOptions._search}
              onChangeSearchText={(value) => {
                setStateCinema('queryOptions', {
                  ...queryOptions,
                  _search: value,
                });
              }}
            />
          </div>
          <div className="flex space-x-2 w-auto">
            <Button
              className="bg-warning border-warning dark:bg-opacity-50 dark:hover:bg-opacity-20"
              onClick={() => {}}
            >
              <span className="whitespace-nowrap">Extension</span>
              <TbDatabaseImport size={20} />
            </Button>
            <Button
              className="bg-success border-success dark:bg-opacity-50 dark:hover:bg-opacity-20"
              onClick={() => {
                navigate('create');
              }}
            >
              <span className="whitespace-nowrap">Thêm mới</span>
              <IoMdAdd size={20} />
            </Button>
          </div>
        </div>
        <CinemaList />
      </div>
    </>
  );
};

export default CinemaManagement;
