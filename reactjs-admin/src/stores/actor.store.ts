import { create } from 'zustand';

interface ActorState {}

const useActorStore = create<ActorState>((set) => ({}));
