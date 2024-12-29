import toast from 'react-hot-toast';
import { create } from 'zustand';
import { fetchCinemaSelection } from '~/apis/cinema.api';
import {
  apiCreateScreen,
  apiUpdateScreen,
  apiUpdateStatusScreen,
  fetchScreenDetail,
  fetchScreenList,
  fetchScreenType,
} from '~/apis/screen.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IObject, IPagination, ISelectOption } from '~/types/common.type';
import { IScreen, IScreenForm } from '~/types/screen.type';
import useGlobalStore from './global.store';
import { ISeatForm } from '~/types/seat.type';
import useSeatStore from './seat.store';

interface IScreenQueryOptions extends IPagination {
  _search: string;
  total?: number;
}

interface ScreenState {
  setStateScreen: (key: string, value: any) => void;

  isEditScreen: boolean;
  isUpdateStatusScreen: boolean;
  isFetchScreenList: boolean;
  queryOptions: IScreenQueryOptions;
  screens: IScreen[];

  screenType: ISelectOption[];
  cinemaSelect: ISelectOption[];
  screenForm: IScreenForm;
  screenFormError: IObject<string>;
  screenDetail: IScreen | null;

  resetScreenForm: () => void;

  reqFetchScreenList: () => Promise<void>;
  reqFetchScreenType: () => Promise<void>;
  reqFetchCinemaSelect: () => Promise<void>;
  reqFetchScreenDetail: (screen_id: number) => Promise<boolean>;
  reqCreateScreen: (seatList: ISeatForm[]) => Promise<boolean>;
  reqUpdateScreen: (screen_id: number, seatList: ISeatForm[]) => Promise<boolean>;
  reqUpdateStatusScreen: (payload: IObject<any>) => Promise<void>;
}

const initScreenForm: IScreenForm = {
  screen_name: '',
  screen_type: '',
  cinema: null,
};

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
  isEditScreen: false,
  isFetchScreenList: false,
  isUpdateStatusScreen: false,
  screens: [],

  screenType: [],
  cinemaSelect: [],
  screenForm: initScreenForm,
  screenFormError: {},
  screenDetail: null,

  resetScreenForm: () => {
    set({
      screenForm: initScreenForm,
      screenDetail: null,
    });
    useSeatStore.getState().resetFormSeat();
  },

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
  reqFetchScreenType: async () => {
    try {
      const res = await fetchScreenType();

      if (
        res.statusCode === STATUS_SUCCESS &&
        res.data &&
        res.data.length > 0
      ) {
        set({
          screenType: res.data.map((dt) => {
            return {
              value: dt,
              label: dt,
            };
          }),
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    }
  },
  reqFetchCinemaSelect: async () => {
    try {
      const res = await fetchCinemaSelection();

      if (
        res.statusCode === STATUS_SUCCESS &&
        res.data &&
        res.data.length > 0
      ) {
        set({
          cinemaSelect: res.data.map((dt) => {
            return {
              value: dt.cinema_id,
              label: dt.cinema_name,
            };
          }),
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    }
  },
  reqFetchScreenDetail: async (screen_id) => {
    let statusDetail: boolean = false;
    useGlobalStore.getState().setFormGroupLoading(true);
    try {
      const res = await fetchScreenDetail(screen_id);
      if (res.statusCode === STATUS_SUCCESS && res.data) {
        statusDetail = true;
        const screenDetail = res.data;
        useSeatStore.getState().setStateSeat(
          'seatMap',
          screenDetail.seats.map((seat) => {
            return {
              id: seat.seat_id,
              x: seat.x,
              y: seat.y,
              label: seat.seat_name,
              status: seat.status,
            };
          }),
        );
        set({
          screenForm: {
            screen_name: screenDetail.screen_name,
            screen_type: screenDetail.screen_type,
            cinema: screenDetail.cinema.cinema_id,
          },
          screenDetail: screenDetail,
        });
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      useGlobalStore.getState().setFormGroupLoading(false);
      return statusDetail;
    }
  },
  reqCreateScreen: async (seatList) => {
    let statusCreate: boolean = false;
    set({ isEditScreen: true });
    try {
      const res = await apiCreateScreen({
        ...get().screenForm,
        seats: seatList,
      });
      if (res.statusCode === STATUS_SUCCESS) {
        statusCreate = true;
        get().resetScreenForm();
        toast.success(res.message);
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isEditScreen: false });
      return statusCreate;
    }
  },
  reqUpdateScreen: async (screen_id, seatList) => {
    let statusUpdate: boolean = false;
    set({ isEditScreen: true });
    try {
      const res = await apiUpdateScreen({
        ...get().screenForm,
        screen_id,
        seats: seatList,
      });
      if (res.statusCode === STATUS_SUCCESS) {
        statusUpdate = true;
        get().resetScreenForm();
        toast.success(res.message);
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isEditScreen: false });
      return statusUpdate;
    }
  },
  reqUpdateStatusScreen: async (payload) => {
    set({ isUpdateStatusScreen: true });
    try {
      const res = await apiUpdateStatusScreen(payload);

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        get().resetScreenForm();
        get().reqFetchScreenList();
      } else {
        toast.error(res.error.toString());
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isUpdateStatusScreen: false });
    }
  },
}));

export default useScreenStore;
