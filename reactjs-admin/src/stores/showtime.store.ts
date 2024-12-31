import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiCreateShowtime, fetchShowtimeList } from '~/apis/showtime.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IObject, IPagination } from '~/types/common.type';
import { IShowtime, IShowtimeForm } from '~/types/showtime.type';

interface IShowtimeQueryOptions extends IPagination {
  _search: string;
  total?: number;
}

interface ShowtimeState {
  setStateShowtime: (key: string, value: any) => void;

  queryOptions: IShowtimeQueryOptions;
  isFetchShowtimeList: boolean;
  isEditShowtime: boolean;
  showtimes: IShowtime[];
  showtimeForm: IShowtimeForm;
  showtimeFormError: IObject<string>;
  cinemaSelected: number;
  resetShowtimeForm: () => void;

  reqFetchDShowtimeList: () => Promise<void>;
  reqCreateShowtime: () => Promise<boolean>;
}

const initShowtimeForm: IShowtimeForm = {
  start_date: '',
  unit_price: 0,
  screen: 0,
  movie: '',
};

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
  isEditShowtime: false,
  showtimes: [],
  showtimeForm: initShowtimeForm,
  showtimeFormError: {},
  cinemaSelected: 0,
  resetShowtimeForm: () => {
    set({
      showtimeForm: initShowtimeForm,
      showtimeFormError: {},
    })
  },

  reqFetchDShowtimeList: async () => {
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
  reqCreateShowtime: async () => {
    let isCreated: boolean = false;
    set({ isEditShowtime: true });
    try {
      const res = await apiCreateShowtime(get().showtimeForm);
      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        isCreated = true;
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isEditShowtime: false });
      return isCreated;
    }
  },
}));

export default useShowtimeStore;
