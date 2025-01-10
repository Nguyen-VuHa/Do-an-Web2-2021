import { create } from "zustand";
import {
  apiSignInAccountNextServer,
  apiSignOutAccount,
  apiSignUpAccount,
} from "~/apis/auth.api";
import {
  PROCESS_ERROR,
  PROCESS_SUCCESS,
  STATUS_SUCCESS,
} from "~/constants/status";
import {
  ISignInForm,
  ISignInPayload,
  ISignUpForm,
  ISignUpPayload,
} from "~/types/auth.type";
import { IObject, IProcessToAPI } from "~/types/common.type";

interface AuthState {
  setStateAuth: (key: string, value: unknown) => void;

  signUpForm: ISignUpForm;
  errorSignUpForm: IObject<string>;

  signInForm: ISignInForm;
  errorSignInForm: IObject<string>;

  isModalConfirmLogout: boolean;

  setSignUpForm: (data: IObject<unknown>) => void;
  resetSignUpForm: () => void;

  setSignInForm: (data: IObject<unknown>) => void;
  resetSignInForm: () => void;
}

const initSignUpForm: ISignUpForm = {
  email: "",
  password: "",
  confirm_password: "",
  fullname: "",
  phone_number: "",
  birth_date: "",
};

const initSignInForm: ISignInForm = {
  email: "",
  password: "",
};

export const useAuthStore = create<AuthState>((set, get) => ({
  setStateAuth: (key, value) => {
    set({
      [key]: value,
    });
  },

  isModalConfirmLogout: false,

  signUpForm: initSignUpForm,
  errorSignUpForm: {},
  setSignUpForm: (data) => {
    set({
      signUpForm: {
        ...get().signUpForm,
        ...data,
      },
    });
  },
  resetSignUpForm: () => {
    set({
      signUpForm: initSignUpForm,
      errorSignUpForm: {},
    });
  },

  signInForm: initSignInForm,
  errorSignInForm: {},

  setSignInForm: (data) => {
    set({
      signInForm: {
        ...get().signInForm,
        ...data,
      },
    });
  },
  resetSignInForm: () => {
    set({
      signInForm: initSignUpForm,
      errorSignInForm: {},
    });
  },
}));

interface AuthAPIState {
  isPostSignUpAccount: boolean;
  postSignUpAccount: (data: ISignUpPayload) => Promise<IProcessToAPI>;

  isPostSignInAccount: boolean;
  postSignInAccount: (data: ISignInPayload) => Promise<IProcessToAPI>;

  isPostSignOutAccount: boolean;
  postSignOutAccount: () => Promise<IProcessToAPI>;
}

const MESSAGE_SIGN_UP_ERROR = "Đăng ký tài khoản thất bại";
const MESSAGE_SIGN_UP_SUCCESS = "Đăng ký tài khoản thành công";

const MESSAGE_SIGN_IN_ERROR = "Đăng nhập tài khoản thất bại";
const MESSAGE_SIGN_IN_SUCCESS = "Đăng nhập tài khoản thành công";

const MESSAGE_SIGN_OUT_ERROR = "Đăng xuất tài khoản thất bại";
const MESSAGE_SIGN_OUT_SUCCESS = "Đăng xuất tài khoản thành công";

export const useAuthAPIStore = create<AuthAPIState>((set) => ({
  isPostSignUpAccount: false,
  postSignUpAccount: async (data) => {
    const errorMsg: IProcessToAPI = {
      status: PROCESS_ERROR,
      message: "",
    };
    set({ isPostSignUpAccount: true });
    try {
      const res = await apiSignUpAccount(data);

      if (res && res.statusCode === STATUS_SUCCESS) {
        errorMsg.status = PROCESS_SUCCESS;
        errorMsg.message = res.message || MESSAGE_SIGN_UP_SUCCESS;

        // reset form sign up
        useAuthStore.getState().resetSignUpForm();
      } else {
        errorMsg.message = res.error?.toString() || MESSAGE_SIGN_UP_ERROR;
      }
    } catch (error: unknown) {
      errorMsg.message = error?.toString() || MESSAGE_SIGN_UP_ERROR;
    } finally {
      set({ isPostSignUpAccount: false });
      return errorMsg;
    }
  },

  isPostSignInAccount: false,
  postSignInAccount: async (data) => {
    const errorMsg: IProcessToAPI = {
      status: PROCESS_ERROR,
      message: "",
    };
    set({ isPostSignInAccount: true });
    try {
      const res = await apiSignInAccountNextServer(data);

      if (res && res.statusCode === STATUS_SUCCESS) {
        errorMsg.status = PROCESS_SUCCESS;
        errorMsg.message = res.message || MESSAGE_SIGN_IN_SUCCESS;

        // reset form sign up
        useAuthStore.getState().resetSignInForm();
      } else {
        errorMsg.message = res.error?.toString() || MESSAGE_SIGN_IN_ERROR;
      }
    } catch (error: unknown) {
      errorMsg.message = error?.toString() || MESSAGE_SIGN_IN_ERROR;
    } finally {
      set({ isPostSignInAccount: false });
      return errorMsg;
    }
  },

  isPostSignOutAccount: false,
  postSignOutAccount: async () => {
    const errorMsg: IProcessToAPI = {
      status: PROCESS_ERROR,
      message: "",
    };
    set({ isPostSignOutAccount: true });
    try {
      const res = await apiSignOutAccount();

      if (res) {
        errorMsg.status = PROCESS_SUCCESS;
        errorMsg.message = res || MESSAGE_SIGN_OUT_SUCCESS;
      } else {
        errorMsg.message = MESSAGE_SIGN_OUT_ERROR;
      }
    } catch (error: unknown) {
      errorMsg.message = error?.toString() || MESSAGE_SIGN_OUT_ERROR;
    } finally {
      set({ isPostSignOutAccount: false });
      return errorMsg;
    }
  },
}));
