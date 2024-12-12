import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  apiChangeStatusMovie,
  apiCreateMovie,
  apiFetchMovieList,
} from '~/apis/movie.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IOject } from '~/types/common.type';
import { IMovie, IMovieForm } from '~/types/movie.type';

interface MovieState {
  categoriesSelected: any[];
  setCategorySelect: (val: any) => void;
  removeCategorySelect: (val: any) => void;

  directorSelected: any[];
  setDirectorSelect: (val: any) => void;
  removeDirectorSelect: (val: any) => void;

  actorSelected: any[];
  setActorSelect: (val: any) => void;
  removeActorSelect: (val: any) => void;

  movieForm: IMovieForm;
  errMovieForm: IOject<string>;
  setMovieFormValue: (form: IOject<any>) => void;
  setErrorMovieForm: (errorForm: IOject<any>) => void;

  isEditMovie: boolean;
  isFetchMovieList: boolean;
  movies: IMovie[];
  movieCondition: IOject<any>;
  startDate: string;
  endDate: string;
  reqFetchMovieList: (params: IOject<any>) => Promise<void>;
  reqCreateMovie: () => Promise<boolean>;
  resetFormMovie: () => void;
  setStartDate: (val: any) => void;
  setEndDate: (val: any) => void;

  movieUpdateStatus: IMovie | null;
  isUpdateStatus: boolean;
  setMovieUpdateStatus: (form: IMovie | null) => void;
  reqUpdateStatusMovie: (payload: IOject<any>) => Promise<void>;
}

const useMovieStore = create<MovieState>((set, get) => ({
  // movie modal
  movieUpdateStatus: null,
  isUpdateStatus: false,
  setMovieUpdateStatus: (data) => {
    set({
      movieUpdateStatus: data,
    });
  },
  reqUpdateStatusMovie: async (payload: IOject<any>) => {
    set({
      isUpdateStatus: true,
    });

    try {
      const res = await apiChangeStatusMovie(payload);

      if (res && res.statusCode === STATUS_SUCCESS) {
        toast.success(res.data || 'Cập nhật trạng thái phim thành công.');
        let movieData = get().movies;

        movieData = movieData.map((movie) => {
          if (movie.movie_id === payload._movie_id) {
            return {
              ...movie,
              status: payload._status,
            };
          } else {
            return movie;
          }
        });

        set({
          movies: movieData,
        });
        set({
          movieUpdateStatus: null,
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isUpdateStatus: false,
      });
    }
  },
  // movie state
  isFetchMovieList: false,
  isEditMovie: false,
  startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  movies: [],
  movieCondition: {
    _page: PAGE_INDEX_DEFAULT,
    _page_size: PAGE_SIZE_DEFAULT,
  },
  setStartDate: (val) => {
    set({
      startDate: val,
    });
  },
  setEndDate: (val) => {
    set({
      endDate: val,
    });
  },
  resetFormMovie: () => {
    set((state) => ({
      ...state,
      movieForm: {
        title: '',
        duration: null,
        start_date: '',
        end_date: '',
        trailer_id: '',
        description: '',
      },
      directorSelected: [],
      actorSelected: [],
      categoriesSelected: [],
      errMovieForm: {},
    }));
  },
  reqFetchMovieList: async (params) => {
    set({ isFetchMovieList: true });

    try {
      const res = await apiFetchMovieList(params);

      if (res.statusCode === 200) {
        set({ movies: res.data.list });
        set((state) => ({
          movieCondition: {
            ...state.movieCondition,
            totalRows: res.data.total,
          },
        }));
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isFetchMovieList: false });
    }
  },
  reqCreateMovie: async () => {
    let statusCreate: boolean = false;
    set({
      isEditMovie: true,
    });
    try {
      const payload: IOject<any> = {
        ...get().movieForm,
        director: get().directorSelected[0],
        actors: get().actorSelected,
        categories: get().categoriesSelected,
      };

      const res = await apiCreateMovie(payload);

      if (res && res.statusCode === STATUS_SUCCESS && res.data) {
        statusCreate = true;
        get().resetFormMovie();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isEditMovie: false,
      });

      return statusCreate;
    }
  },
  // Movie form
  movieForm: {
    title: '',
    duration: null,
    start_date: '',
    end_date: '',
    trailer_id: '',
    description: '',
  },
  errMovieForm: {},
  setErrorMovieForm: (errorForm) => {
    set({
      errMovieForm: errorForm,
    });
  },

  setMovieFormValue: (formData) => {
    set((prev) => ({
      movieForm: {
        ...prev.movieForm,
        ...formData,
      },
    }));
  },
  // Category edit movie
  categoriesSelected: [],

  setCategorySelect: (val) => {
    set((state) => ({
      categoriesSelected: Array.from(
        new Set([...state.categoriesSelected, val]),
      ),
    }));
  },
  removeCategorySelect: (val) => {
    set((state) => ({
      categoriesSelected: state.categoriesSelected.filter(
        (category) => category !== val,
      ),
    }));
  },

  // director edit movie
  directorSelected: [],
  setDirectorSelect: (val) => {
    set({
      directorSelected: [val],
    });
  },
  removeDirectorSelect: (_) => {
    set({
      directorSelected: [],
    });
  },

  // actor edit movie
  actorSelected: [],
  setActorSelect: (val) => {
    set((state) => ({
      actorSelected: Array.from(new Set([...state.actorSelected, val])),
    }));
  },
  removeActorSelect: (val) => {
    set((state) => ({
      actorSelected: state.actorSelected.filter((actor) => actor !== val),
    }));
  },
}));

export default useMovieStore;
