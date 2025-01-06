import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  apiCreateCinema,
  apiDeleteCinema,
  apiUndoDeleteCinema,
  apiUpdateCinema,
  fetchCinemaList,
  fetchDetailCinemaBySlug,
} from '~/apis/cinema.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { ICinema, ICinemaBanner, ICinemaForm } from '~/types/cinema.type';
import { IObject, IPagination } from '~/types/common.type';
import useGlobalStore from './global.store';
import { ACTIVE, INACTIVE } from '~/constants/status';
import { apiCrawlCinemaDetail, apiCrawlEmbedURL } from '~/apis/crawler.api';

interface ICinemaQueryOptions extends IPagination {
  _search: string;
  total?: number;
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

  // state crawler
  isCrawlEmbedURL: boolean;
  addressCrawl: string;
  urlCrawl: string;
  isModalConfirmCrawl: boolean;
  isCrawlCinemaDetail: boolean;
  cinemaCrawlData: ICinemaForm[];
  isProcessCreateMultiCinema: boolean;
  cinemaDataProcess: IObject<any>[];
  bannerSelect: ICinemaBanner | null;
  setCinemaForm: (formData: IObject<any>) => void;
  setCinemaDataProcess: (data: IObject<any>) => void;
  resetCinemaForm: () => void;
  // function handle logic

  // function request API
  reqFetchCinemaList: () => Promise<void>;
  reqFetchCinemaDetail: (slug: string) => Promise<boolean>;
  reqCreateCinema: () => Promise<boolean>;
  reqUpdateCinema: (slug: string) => Promise<boolean>;
  reqDeleteCinema: () => Promise<void>;
  reqUnDoDeleteCinema: () => Promise<void>;
  reqCrawlEmbedURL: (address: string) => Promise<void>;
  reqCrawlCinemaDetail: () => Promise<void>;
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
  bannerSelect: null,
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
      bannerSelect: null,
    });
  },
  setCinemaDataProcess: (data) => {
    set({
      cinemaDataProcess: get().cinemaDataProcess.some(
        (item) => item.title === data['title'],
      )
        ? get().cinemaDataProcess.map((item) =>
            item.title === data['title'] ? data : item,
          )
        : [...get().cinemaDataProcess, data],
    });
  },

  isCrawlEmbedURL: false,
  addressCrawl: '',
  urlCrawl: '',
  isModalConfirmCrawl: false,
  isCrawlCinemaDetail: false,
  isProcessCreateMultiCinema: false,
  cinemaCrawlData: [],
  cinemaDataProcess: [],

  reqCrawlEmbedURL: async (address) => {
    try {
      const res = await apiCrawlEmbedURL({
        _address: address,
      });

      if (res.error === '') {
        if (res.data) {
          set({
            cinemaForm: {
              ...get().cinemaForm,
              embed_map_url: res.data,
            },
          });
        } else {
          toast.error('Không tìm thấy địa chỉ.');
        }
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isCrawlEmbedURL: false,
        addressCrawl: '',
      });
    }
  },
  reqCrawlCinemaDetail: async () => {
    set({ isCrawlCinemaDetail: true });
    try {
      const res = await apiCrawlCinemaDetail({
        _url: get().urlCrawl,
      });

      if (res.error === '') {
        if (res.data && res.data.length > 0) {
          const merged = [...get().cinemaCrawlData, ...res.data].filter(
            (value, index, self) =>
              index ===
              self.findIndex((t) => t.cinema_name === value.cinema_name),
          );

          set({
            cinemaCrawlData: merged,
            urlCrawl: '',
          });
        } else {
          toast.error('Dữ liệu thu thập rỗng');
        }
      } else {
        toast.error(res.error || 'Tiến trình thu thập xảy ra lỗi.');
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isCrawlCinemaDetail: false });
    }
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
        const cinemaData = res.data;
        set({
          cinemaDetail: cinemaData,
          cinemaForm: {
            cinema_name: cinemaData?.cinema_name || '',
            slug: cinemaData?.slug || '',
            address: cinemaData?.address || '',
            area: cinemaData?.area || '',
            embed_map_url: cinemaData?.embed_map_url || '',
          },
          bannerSelect:
            cinemaData?.banner && cinemaData.banner.cinema_banner_id > 0
              ? cinemaData?.banner
              : null,
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
      const res = await apiCreateCinema({
        ...get().cinemaForm,
        banner: get().bannerSelect?.banner_url,
      });
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
  reqUpdateCinema: async (slug) => {
    let statusUpdate: boolean = false;
    set({ isEditCinema: true });
    try {
      const res = await apiUpdateCinema(slug, {
        ...get().cinemaForm,
        banner: get().bannerSelect,
      });
      if (res && res.statusCode === STATUS_SUCCESS && res.data) {
        statusUpdate = true;
        get().resetCinemaForm();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isEditCinema: false });
      return statusUpdate;
    }
  },
  reqDeleteCinema: async () => {
    set({ isUpdateCinemaStatus: true });
    try {
      const res = await apiDeleteCinema(get().cinemaUpdateStatus?.slug || '');

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        set({
          cinemas: get().cinemas.map((cinema) => {
            if (cinema.cinema_id === get().cinemaUpdateStatus?.cinema_id) {
              return {
                ...cinema,
                status: INACTIVE,
              };
            } else return cinema;
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
          cinemas: get().cinemas.map((cinema) => {
            if (cinema.cinema_id === get().cinemaUpdateStatus?.cinema_id) {
              return {
                ...cinema,
                status: ACTIVE,
              };
            } else return cinema;
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
