import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiCreateDirector, apiFetchAllDirector } from '~/apis/director.api';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { BodyCreateDirector, Director } from '~/types/movie-meta.type';

interface DirectorState {
  isFetchDirector: boolean;
  isCreateDirector: boolean;
  directors: Director[];
  directorForm: string;
  setDirectorForm: (val: string) => void;
  reqFetchAllDirectors: () => Promise<void>;
  reqCreateDirector: () => Promise<void>;
}

const useDirectorStore = create<DirectorState>((set, get) => ({
  isFetchDirector: false,
  isCreateDirector: false,
  directors: [],
  directorForm: '',
  setDirectorForm: (val) => {
    set({
      directorForm: val,
    });
  },
  reqFetchAllDirectors: async () => {
    set({
      isFetchDirector: true,
    });
    try {
      let res = await apiFetchAllDirector();

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          directors: res.data || [],
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isFetchDirector: false,
      });
    }
  },
  reqCreateDirector: async () => {
    set({
      isCreateDirector: true,
    });
    try {
      const payload: BodyCreateDirector = {
        director_name: get().directorForm,
      };

      const res = await apiCreateDirector(payload);

      if (res && res.statusCode === STATUS_SUCCESS && res.data) {
        let directorList = [res.data].concat(get().directors);

        set({
          directors: directorList,
          directorForm: '',
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isCreateDirector: false,
      });
    }
  },
}));

export default useDirectorStore;
