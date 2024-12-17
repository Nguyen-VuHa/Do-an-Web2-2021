import toast from 'react-hot-toast';
import { create } from 'zustand';
import { signInAccount } from '~/apis/auth.api';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IPayloadSignIn } from '~/types/auth.type';
import { IObject } from '~/types/common.type';
import { setDataToLocalStore } from '~/utils/localStorage';
import useSystemStore from './system.store';

interface AuthState {
  email: string;
  password: string;
  setInputChange: (newValue: IObject<string>) => void;
  setErrors: (newValue: IObject<string>) => void;
  errors: IObject<string> | null;

  isSignIn: boolean;
  reqSignIn: (payload: IPayloadSignIn) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  email: 'admin@gmail.com',
  password: '123123123',
  setInputChange: (newValues: IObject<string>) =>
    set((state) => ({
      ...state, // Giữ lại tất cả các giá trị cũ
      ...newValues, // Cập nhật các giá trị mới nếu có
    })),
  setErrors: (newValues: IObject<string>) => set({ errors: newValues }),
  errors: null,

  isSignIn: false,
  reqSignIn: async (payload: IPayloadSignIn) => {
    set({ isSignIn: true });
    try {
      const res = await signInAccount(payload);

      if (res.statusCode === STATUS_SUCCESS && res.data) {
        const { accessToken, refreshToken, user } = res.data;
        setDataToLocalStore('accessToken', accessToken);
        setDataToLocalStore('refreshToken', refreshToken);
        useSystemStore.getState().setUserInfo(user);
        window.history.replaceState({}, '', '/');
        window.location.replace('/');
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isSignIn: false });
    }
  },
}));

export default useAuthStore;
