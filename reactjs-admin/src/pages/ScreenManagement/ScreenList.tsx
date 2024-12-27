import Pagination from '~/components/Pagination';
import Table from '~/components/Table/Table.Main';
import Tag from '~/components/Tag';
import { ACTIVE } from '~/constants/status';
import useScreenStore from '~/stores/screen.store';
import { HeaderTable } from '~/types/table.type';
import EditControl from './EditControl';

const ScreenHeader: HeaderTable[] = [
  {
    id: 1,
    label: 'Tên phòng',
    key: 'screen_name',
  },
  {
    id: 2,
    label: 'Loại phòng',
    key: 'screen_type',
  },
  {
    id: 3,
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
    id: 4,
    label: 'Thuộc rạp chiếu',
    key: 'cinema_name',
    extendsion: (data) => {
      return <>{data?.cinema?.cinema_name || '-'}</>;
    },
  },
  {
    id: 5,
    label: 'Thao tác',
    key: 'options',
    extendsion: (data) => {
      return <EditControl data={data} />;
    },
  },
];

const ScreenList = () => {
  const { isFetchScreenList, screens, queryOptions, setStateScreen } =
    useScreenStore();
  return (
    <>
      <Table
        headers={ScreenHeader}
        data={screens}
        dataKey={'screen_id'}
        loading={isFetchScreenList}
      />
      <div className="flex justify-center">
        <Pagination
          page={queryOptions._page}
          pageSize={queryOptions._page_size}
          totalRows={queryOptions.total || 0}
          onChange={(pageIndex) => {
            if (!isFetchScreenList) {
              setStateScreen('queryOptions', {
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

export default ScreenList;
