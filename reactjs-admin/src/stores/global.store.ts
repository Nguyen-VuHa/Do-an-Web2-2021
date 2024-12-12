import { create } from 'zustand';

interface GlobalState {
  isFormGroupLoading: boolean;
  setFormGroupLoading: (status: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set, get) => ({
  isFormGroupLoading: false,
  setFormGroupLoading: (status) => {
    set({
      isFormGroupLoading: status,
    });
  },
}));

export default useGlobalStore;
