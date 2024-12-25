import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  apiCreateCinema,
  apiDeleteCinema,
  apiUndoDeleteCinema,
  fetchCinemaList,
  fetchDetailCinemaBySlug,
} from '~/apis/cinema.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { ICinema, ICinemaForm } from '~/types/cinema.type';
import { IObject, IPagination } from '~/types/common.type';
import useGlobalStore from './global.store';
import { ACTIVE, INACTIVE } from '~/constants/status';

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
  isUpdateCinemaStatus: boolean;
  cinemas: ICinema[];
  cinemaForm: ICinemaForm;
  cinemaFormError: IObject<any>;
  cinemaDetail: ICinema | null;
  cinemaUpdateStatus: ICinema | null;

  setCinemaForm: (formData: IObject<any>) => void;
  resetCinemaForm: () => void;
  // function handle logic

  // function request API
  reqFetchCinemaList: () => Promise<void>;
  reqFetchCinemaDetail: (slug: string) => Promise<boolean>;
  reqCreateCinema: () => Promise<boolean>;
  reqDeleteCinema: () => Promise<void>;
  reqUnDoDeleteCinema: () => Promise<void>;
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
  isUpdateCinemaStatus: false,
  cinemas: [],
  cinemaForm: initCinemaForm,
  cinemaFormError: {},
  cinemaDetail: null,
  cinemaUpdateStatus: null,
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
    });
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
  reqFetchCinemaDetail: async (slug) => {
    let statusFetchDetail: boolean = false;
    useGlobalStore.getState().setFormGroupLoading(true);
    try {
      const res = await fetchDetailCinemaBySlug({
        _slug: slug,
      });

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          cinemaDetail: res.data,
        });
        statusFetchDetail = true;
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      useGlobalStore.getState().setFormGroupLoading(false);
      return statusFetchDetail;
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
  reqDeleteCinema: async () => {
    set({ isUpdateCinemaStatus: true });
    try {
      const res = await apiDeleteCinema(get().cinemaUpdateStatus?.slug || '');

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        set({
          cinemas: get().cinemas.map(cinema => {
            if(cinema.cinema_id === get().cinemaUpdateStatus?.cinema_id) {
              return {
                ...cinema,
                status: INACTIVE,
              }
            } else 
              return cinema;
          }),
          cinemaUpdateStatus: null,
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isUpdateCinemaStatus: false });
    }
  },
  reqUnDoDeleteCinema: async () => {
    set({ isUpdateCinemaStatus: true });
    try {
      const res = await apiUndoDeleteCinema(
        get().cinemaUpdateStatus?.slug || '',
      );

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        set({
          cinemas: get().cinemas.map(cinema => {
            if(cinema.cinema_id === get().cinemaUpdateStatus?.cinema_id) {
              return {
                ...cinema,
                status: ACTIVE,
              }
            } else 
              return cinema;
          }),
          cinemaUpdateStatus: null,
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isUpdateCinemaStatus: false });
    }
  },
}));

export default useCinemaStore;
