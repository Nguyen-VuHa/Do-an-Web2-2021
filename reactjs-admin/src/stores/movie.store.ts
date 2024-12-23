import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  apiChangeStatusMovie,
  apiCreateMovie,
  apiFetchMovieDetail,
  apiFetchMovieList,
  apiUpdateMovie,
} from '~/apis/movie.api';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from '~/constants/default';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IObject } from '~/types/common.type';
import { IDetailMovie, IMovie, IMovieForm } from '~/types/movie.type';
import useGlobalStore from './global.store';

interface MovieState {
  setDataKeyValue: (key: string, value: any) => void;

  categoriesSelected: any[];
  setCategorySelect: (val: any) => void;
  removeCategorySelect: (val: any) => void;

  directorSelected: any[];
  setDirectorSelect: (val: any) => void;
  removeDirectorSelect: (val: any) => void;

  actorSelected: any[];
  setActorSelect: (val: any) => void;
  removeActorSelect: (val: any) => void;

  posterSelected: IObject<any>[];
  posterUpdate: IObject<any> | null;

  movieForm: IMovieForm;
  errMovieForm: IObject<string>;
  setMovieFormValue: (form: IObject<any>) => void;
  setErrorMovieForm: (errorForm: IObject<any>) => void;

  isEditMovie: boolean;
  isFetchMovieList: boolean;
  movies: IMovie[];
  movieCondition: IObject<any>;
  startDate: string;
  endDate: string;
  reqFetchMovieList: (params: IObject<any>) => Promise<void>;
  reqCreateMovie: () => Promise<boolean>;
  reqUpdateMovie: (movieID: string) => Promise<boolean>;
  resetFormMovie: () => void;
  setStartDate: (val: any) => void;
  setEndDate: (val: any) => void;

  movieUpdateStatus: IMovie | null;
  isUpdateStatus: boolean;
  setMovieUpdateStatus: (form: IMovie | null) => void;
  reqUpdateStatusMovie: (payload: IObject<any>) => Promise<void>;

  isFetchDetailMovie: boolean;
  movieDetail: IDetailMovie | null;
  reqFetchMovieDetail: (movieID: string) => Promise<boolean>;
}

const useMovieStore = create<MovieState>((set, get) => ({
  setDataKeyValue: (key, value) => {
    set({
      [key]: value,
    });
  },
  // movie detail
  isFetchDetailMovie: false,
  movieDetail: null,
  reqFetchMovieDetail: async (movieID) => {
    let statusFetchDetail: boolean = false;
    useGlobalStore.getState().setFormGroupLoading(true);
    set({
      isFetchDetailMovie: true,
    });
    try {
      const res = await apiFetchMovieDetail({
        _movie_id: movieID,
      });

      if (res.statusCode === 200 && res.data) {
        const movieDetail = res.data;

        set({
          movieDetail: movieDetail,
          movieForm: {
            title: movieDetail.title,
            duration: movieDetail.duration,
            start_date: movieDetail.start_date,
            end_date: movieDetail.end_date,
            trailer_id: movieDetail.trailer_id,
            description: movieDetail.description,
          },
          directorSelected: [movieDetail.director.director_id],
          actorSelected: movieDetail.actors.map((actor) => {
            return actor.actor_id;
          }),
          categoriesSelected: movieDetail.categories.map((category) => {
            return category.category_id;
          }),
          posterSelected: movieDetail.posters.map((poster) => {
            return {
              ...poster,
              type: 'update',
            };
          }),
        });

        statusFetchDetail = true;
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isFetchDetailMovie: false,
      });
      useGlobalStore.getState().setFormGroupLoading(false);
    }

    return statusFetchDetail;
  },
  // movie modal
  movieUpdateStatus: null,
  isUpdateStatus: false,
  setMovieUpdateStatus: (data) => {
    set({
      movieUpdateStatus: data,
    });
  },
  reqUpdateStatusMovie: async (payload: IObject<any>) => {
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
      posterSelected: [],
      posterUpdate: null,
    }));
  },
  reqFetchMovieList: async (params) => {
    set({ isFetchMovieList: true });

    try {
      const res = await apiFetchMovieList(params);

      if (res.statusCode === 200 && res.data) {
        set({ movies: res.data.list });
        set((state) => ({
          movieCondition: {
            ...state.movieCondition,
            totalRows: res.data?.total,
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
      let payload: IObject<any> = {
        ...get().movieForm,
        director: get().directorSelected[0],
        actors: get().actorSelected,
        categories: get().categoriesSelected,
      };

      if (get().posterSelected.length > 0) {
        payload = {
          ...payload,
          posters: get().posterSelected.map((poster) => {
            return poster.poster_url;
          }),
        };
      }

      const res = await apiCreateMovie(payload);

      if (res && res.statusCode === STATUS_SUCCESS && res.data) {
        statusCreate = true;
        get().resetFormMovie();
      } else {
        toast.error(res.message);
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
  reqUpdateMovie: async (movieID) => {
    let statusUpdate: boolean = false;
    set({
      isEditMovie: true,
    });
    try {
      let payload: IObject<any> = {
        ...get().movieForm,
        director: get().directorSelected[0],
        actors: get().actorSelected,
        categories: get().categoriesSelected,
        movie_id: movieID,
      };

      if (get().posterSelected.length > 0) {
        payload = {
          ...payload,
          posters: get().posterSelected.map((poster) => {
            return {
              movie_poster_id:
                poster.type === 'create' ? null : poster.movie_poster_id,
              poster_url: poster.poster_url,
            };
          }),
        };
      }

      const res = await apiUpdateMovie(payload);

      if (res && res.statusCode === STATUS_SUCCESS && res.data) {
        statusUpdate = true;
        get().resetFormMovie();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isEditMovie: false,
      });

      return statusUpdate;
    }
  },
  // Movie form
  posterSelected: [],
  posterUpdate: null,
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
