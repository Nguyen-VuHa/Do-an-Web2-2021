import dayjs from 'dayjs';
import Pagination from '~/components/Pagination';
import Table from '~/components/Table/Table.Main';
import Tag from '~/components/Tag';
import { ACTIVE } from '~/constants/status';
import useShowtimeStore from '~/stores/showtime.store';
import { HeaderTable } from '~/types/table.type';
import EditControl from './EditControl';

const ShowtimeHeader: HeaderTable[] = [
  {
    id: 1,
    label: 'Code',
    key: 'showtime_id',
  },
  {
    id: 2,
    label: 'Thời gian chiếu',
    key: 'start_time',
    extendsion: (data) => {
      return (
        <>
          {(data.start_time &&
            `(${dayjs(data.start_time).format('HH:mm')} ~ ${dayjs(
              data.end_time,
            ).format('HH:mm')}) - ${dayjs(data.start_time).format(
              'DD/MM/YYYY',
            )}`) ||
            '-'}
        </>
      );
    },
  },
  {
    id: 3,
    label: 'Đơn giá (VNĐ)',
    key: 'unit_price',
    extendsion: (data) => {
      return <>{data?.unit_price?.toLocaleString() || '-'}</>;
    },
  },
  {
    id: 4,
    label: 'Phim',
    key: 'movie',
    extendsion: (data) => {
      return <>{data?.movie?.title || '-'}</>;
    },
  },
  {
    id: 5,
    label: 'Rạp chiếu',
    key: 'cinema',
    extendsion: (data) => {
      return <>{data?.cinema?.cinema_name || '-'}</>;
    },
  },
  {
    id: 6,
    label: 'Phòng chiếu',
    key: 'screen',
    extendsion: (data) => {
      return <>{data?.screen?.screen_name || '-'}</>;
    },
  },
  {
    id: 7,
    label: 'Trạng thái',
    key: 'status',
    extendsion: (data) => {
      return (
        <Tag
          label={data?.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}
          color={data?.status === ACTIVE ? 'success' : 'danger'}
        />
      );
    },
  },
  {
    id: 8,
    label: 'Thao tác',
    key: 'options',
    extendsion: (data) => {
      return <EditControl data={data} />;
    },
  },
];

const ShowtimeList = () => {
  const { isFetchShowtimeList, queryOptions, showtimes, setStateShowtime } =
    useShowtimeStore();
  return (
    <>
      <Table
        headers={ShowtimeHeader}
        data={showtimes}
        dataKey={'showtime_id'}
        loading={isFetchShowtimeList}
      />
      <div className="flex justify-center">
        <Pagination
          page={queryOptions._page}
          pageSize={queryOptions._page_size}
          totalRows={queryOptions.total || 0}
          onChange={(pageIndex) => {
            if (!isFetchShowtimeList) {
              setStateShowtime('queryOptions', {
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

export default ShowtimeList;
