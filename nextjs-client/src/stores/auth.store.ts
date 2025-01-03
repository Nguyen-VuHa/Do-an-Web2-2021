import { create } from "zustand";
import { ISignUpForm } from "~/types/auth.type";
import { IObject } from "~/types/common.type";

interface AuthState {
  setStateAuth: (key: string, value: unknown) => void;

  signUpForm: ISignUpForm;
  errorSignUpForm: IObject<unknown>;

  setSignUpForm: (data: IObject<unknown>) => void;
}

const initSignUpForm: ISignUpForm = {
  email: "",
  password: "",
  confirm_password: "",
  fullname: "",
  phone_number: "",
  birth_date: "",
};

const useAuthStore = create<AuthState>((set, get) => ({
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
}));

export default useAuthStore;
