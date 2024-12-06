import toast from 'react-hot-toast';
import { create } from 'zustand';
import { fetchUserInfo } from '~/apis/user.api';
import { IUserInfo } from '~/types/user.type';

interface SystemState {
  isFetchUserInfo: boolean;
  userInfo: IUserInfo | null;
  setUserInfo: (user: IUserInfo) => void;
  reqFetchUserInfo: () => Promise<void>;
}

const useSystemStore = create<SystemState>((set) => ({
  isFetchUserInfo: false,
  userInfo: null,
  setUserInfo: (user: IUserInfo) =>
    set({
      userInfo: user,
    }),
  reqFetchUserInfo: async () => {
    set({ isFetchUserInfo: true });

    try {
      const res = await fetchUserInfo();

      if (res.statusCode === 200) {
        set({ userInfo: res.data });
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isFetchUserInfo: false });
    }
  },
}));

export default useSystemStore;
