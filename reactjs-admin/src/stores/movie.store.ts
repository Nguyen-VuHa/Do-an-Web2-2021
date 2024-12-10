import { create } from 'zustand';

interface MovieState {
  categoriesSelected: any[];
  setCategorySelect: (val: any) => void;
  removeCategorySelect: (val: any) => void;
}

const useMovieStore = create<MovieState>((set) => ({
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
}));

export default useMovieStore;
