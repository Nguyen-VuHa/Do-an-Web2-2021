import { create } from "zustand";
import { apiFetchShowtimeByCinema } from "~/apis/showtime.api";
import { STATUS_SUCCESS } from "~/constants/status";
import { IShowtimeByCinema } from "~/types/showtime.type";

interface ShowtimeState {
  setStateShowtime: (key: string, value: unknown) => void;

  isFetchShowtimeCinema: boolean;
  cinemaSelect: string;
  errorMessage: string;
  showtimeCinema: IShowtimeByCinema[];

  reqFetchShowtimeByCinema: (slug: string) => Promise<void>;
}

export const useShowtimeStore = create<ShowtimeState>((set) => ({
  setStateShowtime: (key, value) => {
    set({
      [key]: value,
    });
  },
  isFetchShowtimeCinema: false,
  cinemaSelect: "",
  errorMessage: "",
  showtimeCinema: [],

  reqFetchShowtimeByCinema: async (slug) => {
    set({ isFetchShowtimeCinema: true });
    try {
      const res = await apiFetchShowtimeByCinema(slug);

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          showtimeCinema: res.data || [],
        });
      } else {
        set({
          errorMessage: res.error?.toString(),
        });
      }
    } catch (error) {
      set({
        errorMessage: error?.toString(),
      });
    } finally {
      set({ isFetchShowtimeCinema: false });
    }
  },
}));
