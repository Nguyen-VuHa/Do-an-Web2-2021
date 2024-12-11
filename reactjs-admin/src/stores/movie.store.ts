import { create } from 'zustand';
import { IOject } from '~/types/common.type';
import { IMovieForm } from '~/types/movie.type';

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
}

const useMovieStore = create<MovieState>((set) => ({
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
