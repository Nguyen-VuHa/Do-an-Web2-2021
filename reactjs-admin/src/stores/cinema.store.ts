import toast from 'react-hot-toast';
import { create } from 'zustand';
import { fetchCinemaList } from '~/apis/cinema.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { ICinema } from '~/types/cinema.type';
import { IPagination } from '~/types/common.type';

interface ICinemaQueryOptions extends IPagination {
  _search: string
}

interface CinemaState {
  setStateCinema: (key: string, value: any) => void;
  // condition filter cinemas
  queryOptions: ICinemaQueryOptions;

  // state cinemas
  isFetchCinemaList: boolean;
  cinemas: ICinema[];

  // function handle logic

  // function request API
  reqFetchCinemaList: () => Promise<void>;
}
const useCinemaStore = create<CinemaState>((set, get) => ({
  setStateCinema: (key, value) => {
    set({
      [key]: value,
    });
  },

  queryOptions: {
    _page: PAGE_INDEX_DEFAULT,
    _page_size: PAGE_SIZE_DEFAULT,
    _search: '',
  },

  isFetchCinemaList: false,
  cinemas: [],


  reqFetchCinemaList: async () => {
    set({ isFetchCinemaList: true })
    try {
        const res = await fetchCinemaList(get().queryOptions)

        if(res.statusCode === STATUS_SUCCESS) {
            const cinemaData = res.data;
            set({
                cinemas: cinemaData?.list,
                queryOptions: {
                  ...get().queryOptions,
                  total: cinemaData?.total
                }
            })
        } else {
            toast.error(res.error.toString())
        }
    } catch (error) {
        toast.error(error?.toString() as string);
    } finally {
        set({ isFetchCinemaList: false })
    }
  },
}));

export default useCinemaStore;
