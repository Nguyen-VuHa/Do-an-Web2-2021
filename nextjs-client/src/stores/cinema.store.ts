import { create } from "zustand";
import { ICinema } from "~/types/cinema.type";

interface CinemaState {
  setStateCinema: (key: string, value: unknown) => void;

  cinemaList: ICinema[];
  cinemaArea: string;
}

export const useCinemaStore = create<CinemaState>((set) => ({
  setStateCinema: (key, value) => {
    set({
      [key]: value,
    });
  },

  cinemaList: [],
  cinemaArea: "ALL",
}));
