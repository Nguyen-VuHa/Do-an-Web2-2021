import Pagination from '~/components/Pagination';
import Table from '~/components/Table/Table.Main';
import Tag from '~/components/Tag';
import { ACTIVE } from '~/constants/status';
import useCinemaStore from '~/stores/cinema.store';
import { HeaderTable } from '~/types/table.type';
import EditControl from './EditControl';

const CinemaHeader: HeaderTable[] = [
  {
    id: 1,
    label: 'Tên rạp chiếu',
    key: 'cinema_name',
  },
  {
    id: 2,
    label: 'Slug',
    key: 'slug',
  },
  {
    id: 3,
    label: 'Khu vực',
    key: 'area',
  },
  {
    id: 4,
    label: 'Địa chỉ',
    key: 'address',
  },
  {
    id: 5,
    label: 'Trạng thái',
    key: 'status',
    extendsion: (data) => {
      return (
        <Tag
          label={data.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}
          color={data.status === ACTIVE ? 'success' : 'danger'}
        />
      );
    },
  },
  {
    id: 6,
    label: 'Thao tác',
    key: 'options',
    extendsion: (data) => {
      return <EditControl data={data} />;
    },
  },
];

const CinemaList = () => {
  const { isFetchCinemaList, cinemas, queryOptions, setStateCinema } =
    useCinemaStore();
  return (
    <>
      <Table
        headers={CinemaHeader}
        data={cinemas}
        dataKey={'cinema_id'}
        loading={isFetchCinemaList}
      />
      <div className="flex justify-center">
        <Pagination
          page={queryOptions._page}
          pageSize={queryOptions._page_size}
          totalRows={queryOptions.total || 0}
          onChange={(pageIndex) => {
            if (!isFetchCinemaList) {
              setStateCinema('queryOptions', {
                ...queryOptions,
                _page: pageIndex,
              });
            }
          }}
        />
      </div>
    </>
  );
};

export default CinemaList;
