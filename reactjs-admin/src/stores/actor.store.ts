import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiCreateActor, apiFetchAllActor } from '~/apis/actor.api';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { Actor, BodyCreateActor } from '~/types/movie-meta.type';

interface ActorState {
  isFetchActors: boolean;
  isCreateActor: boolean;
  actors: Actor[];
  actorForm: string;
  setActorForm: (val: string) => void;
  reqFetchAllActor: () => Promise<void>;
  reqCreateActor: () => Promise<void>;
}

const useActorStore = create<ActorState>((set, get) => ({
  isFetchActors: false,
  isCreateActor: false,
  actors: [],
  actorForm: '',
  setActorForm: (val) => {
    set({
      actorForm: val,
    });
  },
  reqFetchAllActor: async () => {
    set({
      isFetchActors: true,
    });
    try {
      let res = await apiFetchAllActor();

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          actors: res.data || [],
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isFetchActors: false,
      });
    }
  },
  reqCreateActor: async () => {
    set({
      isCreateActor: true,
    });
    try {
      const payload: BodyCreateActor = {
        actor_name: get().actorForm,
      };

      const res = await apiCreateActor(payload);

      if (res && res.statusCode === STATUS_SUCCESS && res.data) {
        let actorList = [res.data].concat(get().actors);

        set({
          actors: actorList,
          actorForm: '',
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isCreateActor: false,
      });
    }
  },
}));

export default useActorStore;
