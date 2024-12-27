import toast from 'react-hot-toast';
import { create } from 'zustand';
import { fetchScreenList } from '~/apis/screen.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IPagination } from '~/types/common.type';
import { IScreen } from '~/types/screen.type';

interface IScreenQueryOptions extends IPagination {
  _search: string;
  total?: number;
}

interface ScreenState {
  setStateScreen: (key: string, value: any) => void;

  isFetchScreenList: boolean;
  queryOptions: IScreenQueryOptions;
  screens: IScreen[];

  reqFetchScreenList: () => Promise<void>;
}

const useScreenStore = create<ScreenState>((set, get) => ({
  setStateScreen: (key, value) => {
    set({
      [key]: value,
    });
  },

  queryOptions: {
    _page: PAGE_INDEX_DEFAULT,
    _page_size: PAGE_SIZE_DEFAULT,
    _search: '',
  },
  isFetchScreenList: false,
  screens: [],

  reqFetchScreenList: async () => {
    set({ isFetchScreenList: true });
    try {
      const res = await fetchScreenList(get().queryOptions);

      if (res.statusCode === STATUS_SUCCESS) {
        const screenData = res.data;
        set({
          screens: screenData?.list,
          queryOptions: {
            ...get().queryOptions,
            total: screenData?.total,
          },
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isFetchScreenList: false });
    }
  },
}));

export default useScreenStore;
