import { create } from "zustand";
import { apiFetchUserInfo } from "~/apis/user.api";
import { STATUS_SUCCESS } from "~/constants/status";
import { IUserInfo } from "~/types/user.type";

interface UserState {
  setStateUser: (key: string, value: any) => void;

  userInfo: IUserInfo;
  isUserLoged: boolean;
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
}));

interface UserAPIState {
  isFetchUserInfo: boolean;
  getUserInfo: () => Promise<void>;
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isFetchUserInfo: false });
    }
  },
}));
