import toast from 'react-hot-toast';
import { create } from 'zustand';
import { fetchShowtimeList } from '~/apis/showtime.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IPagination } from '~/types/common.type';
import { IShowtime } from '~/types/showtime.type';

interface IShowtimeQueryOptions extends IPagination {
  _search: string;
  total?: number;
}

interface ShowtimeState {
  setStateShowtime: (key: string, value: any) => void;

  queryOptions: IShowtimeQueryOptions;
  isFetchShowtimeList: boolean;
  showtimes: IShowtime[];

  reqFetchScreenList: () => Promise<void>;
}

const useShowtimeStore = create<ShowtimeState>((set, get) => ({
  setStateShowtime: (key, value) => {
    set({
      [key]: value,
    });
  },

  queryOptions: {
    _page: PAGE_INDEX_DEFAULT,
    _page_size: PAGE_SIZE_DEFAULT,
    _search: '',
  },
  isFetchShowtimeList: false,
  showtimes: [],

  reqFetchScreenList: async () => {
    set({ isFetchShowtimeList: true });
    try {
      const res = await fetchShowtimeList(get().queryOptions);

      if (res.statusCode === STATUS_SUCCESS) {
        const showtimeData = res.data;
        set({
          showtimes: showtimeData?.list,
          queryOptions: {
            ...get().queryOptions,
            total: showtimeData?.total,
          },
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isFetchShowtimeList: false });
    }
  },
}));

export default useShowtimeStore;
