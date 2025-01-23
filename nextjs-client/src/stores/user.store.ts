import { create } from "zustand";
import { apiFetchUserInfo, apiUpdateUserInfo } from "~/apis/user.api";
import { STATUS_SUCCESS } from "~/constants/status";
import { IUserInfo } from "~/types/user.type";
import { useNotifyStore } from "./notify.store";

interface UserState {
  setStateUser: (key: string, value: any) => void;

  userInfo: IUserInfo;
  isUserLoged: boolean;

  isEditInfo: boolean;
  userEditForm: any;
}

const initUserInfo: IUserInfo = {
  user_id: "",
  email: "",
  fullname: "",
  birth_day: "",
  phone_number: "",
  gender: "",
  image_url: "",
  cover_image_url: "",
  balance: 0,
};

export const useUserStore = create<UserState>((set) => ({
  setStateUser: (key, value) => {
    set({
      [key]: value,
    });
  },

  isUserLoged: false,
  userInfo: initUserInfo,

  isEditInfo: false,
  userEditForm: null,
}));

interface UserAPIState {
  isFetchUserInfo: boolean;
  getUserInfo: () => Promise<void>;

  isUpdateUserInfo: boolean;
  updateUserInfo: (payload: any) => Promise<string>;
}

export const useUserAPIStore = create<UserAPIState>((set) => ({
  isFetchUserInfo: false,
  getUserInfo: async () => {
    set({ isFetchUserInfo: true });
    try {
      const res = await apiFetchUserInfo();

      if (res && res.statusCode === STATUS_SUCCESS) {
        useUserStore.getState().setStateUser("userInfo", res.data);
        useUserStore.getState().setStateUser("isUserLoged", true);
        useNotifyStore
          .getState()
          .setStateNotify("notify_unread", res.data?.notify_unread || 0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isFetchUserInfo: false });
    }
  },

  isUpdateUserInfo: false,
  updateUserInfo: async (payload) => {
    let errorMessage = ''
    try {
      set({ isUpdateUserInfo: true });
      const res = await apiUpdateUserInfo(payload);

      if (res && res.statusCode === STATUS_SUCCESS) {
        useUserStore.getState().setStateUser("userInfo", {
          ...useUserStore.getState().userInfo,
          ...payload,
          gender: (payload.gender && payload.gender === 'male' ? 'Nam' : 'Nữ') || '',
        });
        useUserStore.getState().setStateUser("isEditInfo", false);
        useUserStore.getState().setStateUser("userEditForm", null);
      } else {
        errorMessage = 'Cập nhật thất bại'
      }
    } catch (error) {
      errorMessage = error?.toString() || 'Cập nhật thất bại';
    } finally {
      set({ isUpdateUserInfo: false });

      return errorMessage;
    }
  },
}));
