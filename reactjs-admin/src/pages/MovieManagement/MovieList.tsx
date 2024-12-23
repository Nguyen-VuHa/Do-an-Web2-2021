import Pagination from '~/components/Pagination';
import Table from '~/components/Table/Table.Main';
import Tag from '~/components/Tag';
import useMovieStore from '~/stores/movie.store';
import { HeaderTable } from '~/types/table.type';
import EditControl from './EditControl';
import { ACTIVE } from '~/constants/status';
import { getColorByMovieType } from '~/utils/detect';

const MovieHeader: HeaderTable[] = [
  {
    id: 1,
    label: 'Tên phim',
    key: 'title',
  },
  {
    id: 2,
    label: 'Thời lượng (phút)',
    key: 'duration',
  },
  {
    id: 3,
    label: 'Ngày khởi chiếu',
    key: 'start_date',
  },
  {
    id: 4,
    label: 'Ngày kết thúc',
    key: 'end_date',
  },
  {
    id: 5,
    label: 'Hình thức',
    key: 'movie_type',
    extendsion: (data) => {
      return (
        <Tag
          label={data.movie_type}
          color={getColorByMovieType(data.movie_type)}
        />
      );
    },
  },
  {
    id: 6,
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
    id: 7,
    label: 'Thao tác',
    key: 'options',
    extendsion: (data) => {
      return <EditControl data={data} />;
    },
  },
];

const MovieList = () => {
  const { movies, isFetchMovieList, movieCondition, setDataKeyValue } =
    useMovieStore();

  return (
    <>
      <Table
        headers={MovieHeader}
        data={movies}
        dataKey={'movie_id'}
        loading={isFetchMovieList}
      />
      <div className="flex justify-center">
        <Pagination
          page={movieCondition._page}
          pageSize={movieCondition._page_size}
          totalRows={movieCondition.totalRows}
          onChange={(pageIndex) => {
            if (!isFetchMovieList) {
              setDataKeyValue('movieCondition', {
                ...movieCondition,
                _page: pageIndex,
              });
            }
          }}
        />
      </div>
    </>
  );
};

export default MovieList;
