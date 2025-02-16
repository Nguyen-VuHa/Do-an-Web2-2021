import { create } from "zustand";
import {
  apiFetchUserInfo,
  apiGetBookingHistory,
  apiGetUserAvatar,
  apiUpdatePhotoUser,
  apiUpdateUserInfo,
  apiUploadAvatarUser,
} from "~/apis/user.api";
import { STATUS_SUCCESS } from "~/constants/status";
import {
  IUpdatePhotoUserRequest,
  IUserAvatarList,
  IUserBookingHistory,
  IUserInfo,
} from "~/types/user.type";
import { useNotifyStore } from "./notify.store";

interface UserState {
  setStateUser: (key: string, value: any) => void;

  userInfo: IUserInfo;
  isUserLoged: boolean;

  isEditInfo: boolean;
  userEditForm: any;

  bookingHistory: IUserBookingHistory[];
  avatarUpload: File | null;
  avatarPreview: string;
  isModalEditAvatar: boolean;

  userAvatars: IUserAvatarList[];
  avatarSelected: string;
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

  bookingHistory: [],
  userAvatars: [],

  avatarUpload: null,
  avatarPreview: "",
  isModalEditAvatar: false,
  avatarSelected: "",
}));

interface UserAPIState {
  isFetchUserInfo: boolean;
  getUserInfo: () => Promise<void>;

  isUpdateUserInfo: boolean;
  updateUserInfo: (payload: any) => Promise<string>;

  isFetchBookingHistory: boolean;
  getUserBookingHistory: () => Promise<void>;

  isFetchUserAvatarList: boolean;
  getUserAvartarList: () => Promise<void>;

  isUploadAvatar: boolean;
  uploadAvatarUser: (formData: FormData) => Promise<void>;

  isUpdatePhotoUser: boolean;
  updatePhotoUser: (data: IUpdatePhotoUserRequest) => Promise<void>;
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
    let errorMessage = "";
    try {
      set({ isUpdateUserInfo: true });
      const res = await apiUpdateUserInfo(payload);

      if (res && res.statusCode === STATUS_SUCCESS) {
        useUserStore.getState().setStateUser("userInfo", {
          ...useUserStore.getState().userInfo,
          ...payload,
          gender:
            payload?.gender === "male"
              ? "Nam"
              : payload?.gender === "female"
                ? "Nữ"
                : "",
        });
        useUserStore.getState().setStateUser("isEditInfo", false);
        useUserStore.getState().setStateUser("userEditForm", null);
      } else {
        errorMessage = "Cập nhật thất bại";
      }
    } catch (error) {
      errorMessage = error?.toString() || "Cập nhật thất bại";
    } finally {
      set({ isUpdateUserInfo: false });

      return errorMessage;
    }
  },

  isFetchBookingHistory: false,
  getUserBookingHistory: async () => {
    try {
      set({ isFetchBookingHistory: true });
      const res = await apiGetBookingHistory();

      if (res && res.statusCode === STATUS_SUCCESS) {
        useUserStore.getState().setStateUser("bookingHistory", res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isFetchBookingHistory: false });
    }
  },

  isFetchUserAvatarList: false,
  getUserAvartarList: async () => {
    try {
      set({ isFetchUserAvatarList: true });
      const res = await apiGetUserAvatar();

      if (res && res.statusCode === STATUS_SUCCESS) {
        useUserStore.getState().setStateUser("userAvatars", res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isFetchUserAvatarList: false });
    }
  },

  isUploadAvatar: false,
  uploadAvatarUser: async (formData) => {
    try {
      set({ isUploadAvatar: true });
      const res = await apiUploadAvatarUser(formData);

      if (res && res.statusCode === STATUS_SUCCESS) {
        if (res.data) {
          useUserStore
            .getState()
            .setStateUser(
              "userAvatars",
              [res.data].concat(useUserStore.getState().userAvatars),
            );
        }

        useUserStore.getState().setStateUser("avatarUpload", null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUploadAvatar: false });
    }
  },

  isUpdatePhotoUser: false,
  updatePhotoUser: async (data) => {
    try {
      set({ isUpdatePhotoUser: true });
      const res = await apiUpdatePhotoUser(data);

      if (res && res.statusCode === STATUS_SUCCESS) {
        useUserStore.getState().setStateUser("isModalEditAvatar", false);
        useUserStore.getState().setStateUser("userInfo", {
          ...useUserStore.getState().userInfo,
          image_url: data.image_url,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdatePhotoUser: false });
    }
  },
}));
