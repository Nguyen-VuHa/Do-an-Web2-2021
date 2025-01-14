import { create } from "zustand";

interface GlobalState {
  setStateGlobal: (key: string, value: unknown) => void;

  isModalViewTrailer: boolean;
  trailerID: string;

  isDisableScreen: boolean;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  setStateGlobal: (key, value) => {
    set({
      [key]: value,
    });
  },

  isModalViewTrailer: false,
  trailerID: "",
  isDisableScreen: false,
}));
