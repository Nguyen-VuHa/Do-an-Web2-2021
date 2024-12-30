import { IoMdAdd } from 'react-icons/io';
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import InputSearch from '~/components/InputSearch/InputSearch.Main';
import ShowtimeList from './ShowtimeList';
import useShowtimeStore from '~/stores/showtime.store';
import { useEffect } from 'react';
import { PAGE_INDEX_DEFAULT } from '~/constants/default';

const ShowtimeManagement = () => {
  const {
    isFetchShowtimeList,
    queryOptions,
    reqFetchScreenList,
    setStateShowtime,
  } = useShowtimeStore();

  useEffect(() => {
    reqFetchScreenList();
  }, [queryOptions._page, queryOptions._search, queryOptions._page_size]);

  return (
    <>
      <Breadcrumb pageName="Quản lý suất chiếu" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-5">
        <div className="w-full flex justify-between items-center">
          <div className="w-[50%]">
            <InputSearch
              placeholder="Nhập mã code suất chiếu cần tìm ..."
              value={queryOptions._search || ''}
              loading={isFetchShowtimeList}
              onChangeSearchText={(value) => {
                setStateShowtime('queryOptions', {
                  ...queryOptions,
                  _page: PAGE_INDEX_DEFAULT,
                  _search: value,
                });
              }}
            />
          </div>
          <div className="flex space-x-2 w-auto">
            <Button
              className="bg-success border-success dark:bg-opacity-50 dark:hover:bg-opacity-20"
              onClick={() => {}}
            >
              <span className="whitespace-nowrap">Thêm mới</span>
              <IoMdAdd size={20} />
            </Button>
          </div>
        </div>
        <ShowtimeList />
      </div>
    </>
  );
};

export default ShowtimeManagement;
