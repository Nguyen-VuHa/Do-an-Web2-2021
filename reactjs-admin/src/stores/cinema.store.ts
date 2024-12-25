import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiCreateCinema, fetchCinemaList } from '~/apis/cinema.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { ICinema, ICinemaForm } from '~/types/cinema.type';
import { IObject, IPagination } from '~/types/common.type';

interface ICinemaQueryOptions extends IPagination {
  _search: string;
}

interface CinemaState {
  setStateCinema: (key: string, value: any) => void;
  // condition filter cinemas
  queryOptions: ICinemaQueryOptions;

  // state cinemas
  isFetchCinemaList: boolean;
  isEditCinema: boolean;
  cinemas: ICinema[];
  cinemaForm: ICinemaForm;
  cinemaFormError: IObject<any>;
  setCinemaForm: (formData: IObject<any>) => void;
  resetCinemaForm: () => void;
  // function handle logic

  // function request API
  reqFetchCinemaList: () => Promise<void>;
  reqCreateCinema: () => Promise<boolean>;
}

const initCinemaForm: ICinemaForm = {
  cinema_name: '',
  slug: '',
  address: '',
  area: '',
  embed_map_url: '',
};

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
  isEditCinema: false,
  cinemas: [],
  cinemaForm: initCinemaForm,
  cinemaFormError: {},
  setCinemaForm: (formData) => {
    set({
      cinemaForm: {
        ...get().cinemaForm,
        ...formData,
      },
    });
  },
  resetCinemaForm: () => {
    set({
      cinemaForm: initCinemaForm,
      cinemaFormError: {},
    })
  },

  reqFetchCinemaList: async () => {
    set({ isFetchCinemaList: true });
    try {
      const res = await fetchCinemaList(get().queryOptions);

      if (res.statusCode === STATUS_SUCCESS) {
        const cinemaData = res.data;
        set({
          cinemas: cinemaData?.list,
          queryOptions: {
            ...get().queryOptions,
            total: cinemaData?.total,
          },
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isFetchCinemaList: false });
    }
  },
  reqCreateCinema: async () => {
    let statusCreate: boolean = false;
    set({ isEditCinema: true });
    try {
      const res = await apiCreateCinema(get().cinemaForm);
      if (res && res.statusCode === STATUS_SUCCESS && res.data) {
        statusCreate = true;
        get().resetCinemaForm();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isEditCinema: false });
      return statusCreate;
    }
  },
}));

export default useCinemaStore;
