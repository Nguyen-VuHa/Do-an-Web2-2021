import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  apiCreateShowtime,
  apiUpdateStatusShowtime,
  fetchShowtimeDetail,
  fetchShowtimeList,
} from '~/apis/showtime.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IObject, IPagination } from '~/types/common.type';
import { IShowtime, IShowtimeForm } from '~/types/showtime.type';
import useGlobalStore from './global.store';

interface IShowtimeQueryOptions extends IPagination {
  _search: string;
  total?: number;
}

interface ShowtimeState {
  setStateShowtime: (key: string, value: any) => void;

  queryOptions: IShowtimeQueryOptions;
  isFetchShowtimeList: boolean;
  isUpdateStatusShowtime: boolean;
  isEditShowtime: boolean;
  showtimes: IShowtime[];
  showtimeForm: IShowtimeForm;
  showtimeFormError: IObject<string>;
  cinemaSelected: number;
  showtimeDetail: IShowtime | null;
  resetShowtimeForm: () => void;

  reqFetchDShowtimeList: () => Promise<void>;
  reqFetchShowtimeDetail: (showtime_id: string) => Promise<boolean>;
  reqCreateShowtime: () => Promise<boolean>;
  reqUpdateStatusShowtime: (payload: IObject<any>) => Promise<void>;
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
  isUpdateStatusShowtime: false,
  isEditShowtime: false,
  showtimes: [],
  showtimeForm: initShowtimeForm,
  showtimeFormError: {},
  cinemaSelected: 0,
  showtimeDetail: null,
  resetShowtimeForm: () => {
    set({
      showtimeForm: initShowtimeForm,
      showtimeFormError: {},
      showtimeDetail: null,
    });
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
  reqFetchShowtimeDetail: async (showtime_id) => {
    let isDetail: boolean = false;
    useGlobalStore.getState().setFormGroupLoading(true);
    try {
      const res = await fetchShowtimeDetail(showtime_id);
      if (res.statusCode === STATUS_SUCCESS) {
        isDetail = true;
        set({
          showtimeDetail: res.data,
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      useGlobalStore.getState().setFormGroupLoading(false);
      return isDetail;
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
  reqUpdateStatusShowtime: async (payload) => {
    set({ isUpdateStatusShowtime: true });
    try {
      const res = await apiUpdateStatusShowtime(payload);

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        get().resetShowtimeForm();
        get().reqFetchDShowtimeList();
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isUpdateStatusShowtime: false });
    }
  },
}));

export default useShowtimeStore;
