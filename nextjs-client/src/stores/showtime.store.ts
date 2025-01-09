import { create } from "zustand";
import {
  apiFetchShowtimeByCinema,
  apiFetchShowtimeByMovie,
} from "~/apis/showtime.api";
import { STATUS_SUCCESS } from "~/constants/status";
import { IShowtimeByCinema, IShowtimeByMovie } from "~/types/showtime.type";

interface ShowtimeState {
  setStateShowtime: (key: string, value: unknown) => void;

  isFetchShowtimeCinema: boolean;
  isFetchShowtimeMovie: boolean;
  cinemaSelect: string;
  errorMessage: string;
  showtimeCinema: IShowtimeByCinema[];
  showtimeMovie: IShowtimeByMovie[];
  showtimeArea: string[];
  isShowtimeView: number;

  reqFetchShowtimeByCinema: (slug: string) => Promise<void>;
  reqFetchShowtimeByMovie: (movie_id: string) => Promise<void>;
}

export const useShowtimeStore = create<ShowtimeState>((set) => ({
  setStateShowtime: (key, value) => {
    set({
      [key]: value,
    });
  },
  isFetchShowtimeCinema: false,
  isFetchShowtimeMovie: false,
  cinemaSelect: "",
  errorMessage: "",
  showtimeCinema: [],
  showtimeMovie: [],
  showtimeArea: [],
  isShowtimeView: 0,

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
  reqFetchShowtimeByMovie: async (movie_id) => {
    set({ isFetchShowtimeMovie: true });
    try {
      const res = await apiFetchShowtimeByMovie(movie_id);

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          showtimeMovie: res.data?.showtimes || [],
          showtimeArea: res.data?.areas || [],
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
      set({ isFetchShowtimeMovie: false });
    }
  },
}));
