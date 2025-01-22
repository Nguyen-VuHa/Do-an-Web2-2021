import { create } from "zustand";
import { apiFetchNotifyList, apiUpdateNotifyStatus } from "~/apis/notify.api";
import { STATUS_SUCCESS } from "~/constants/status";
import { IObject } from "~/types/common.type";
import { INotify } from "~/types/notify.type";

interface NotifyState {
  setStateNotify: (key: string, value: unknown) => void;

  notify: INotify[];
  isFetchNotify: boolean;
  pagination: any;
  notify_unread: number;

  getNotifyList: (params: IObject<any>) => Promise<void>;
  updateNotifyStatus: () => Promise<void>;
}

export const useNotifyStore = create<NotifyState>((set, get) => ({
  setStateNotify: (key, value) => {
    set({
      [key]: value,
    });
  },

  notify: [],
  isFetchNotify: false,
  pagination: {
    page: 1,
    page_size: 20,
    total: 0,
  },
  notify_unread: 0,
  getNotifyList: async (params) => {
    try {
      set({ isFetchNotify: true });

      const response = await apiFetchNotifyList(params);

      if (response.statusCode === STATUS_SUCCESS) {
        const data = response.data;
        set({
          pagination: {
            ...get().pagination,
            total: data?.total || 0,
          },
          notify: data?.list || [],
        });
      } else {
        console.log(response.error?.toString());
      }
    } catch (error) {
      console.log(error?.toString());
    } finally {
      set({ isFetchNotify: false });
    }
  },
  updateNotifyStatus: async () => {
    try {
      await apiUpdateNotifyStatus();
    } catch (error) {
      console.log(error?.toString());
    }
  },
}));
