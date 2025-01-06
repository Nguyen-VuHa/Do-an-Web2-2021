import { create } from "zustand";
import { apiSignUpAccount } from "~/apis/auth.api";
import {
  PROCESS_ERROR,
  PROCESS_SUCCESS,
  STATUS_SUCCESS,
} from "~/constants/status";
import { ISignUpForm, ISignUpPayload } from "~/types/auth.type";
import { IObject, IProcessToAPI } from "~/types/common.type";

interface AuthState {
  setStateAuth: (key: string, value: unknown) => void;

  signUpForm: ISignUpForm;
  errorSignUpForm: IObject<string>;

  setSignUpForm: (data: IObject<unknown>) => void;
  resetSignUpForm: () => void;
}

const initSignUpForm: ISignUpForm = {
  email: "",
  password: "",
  confirm_password: "",
  fullname: "",
  phone_number: "",
  birth_date: "",
};

export const useAuthStore = create<AuthState>((set, get) => ({
  setStateAuth: (key, value) => {
    set({
      [key]: value,
    });
  },

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
}));

interface AuthAPIState {
  isPostSignUpAccount: boolean;
  postSignUpAccount: (data: ISignUpPayload) => Promise<IProcessToAPI>;
}

const MESSAGE_SIGN_UP_ERROR = "Đăng ký tài khoản thất bại";
const MESSAGE_SIGN_UP_SUCCESS = "Đăng ký tài khoản thành công";

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
}));
