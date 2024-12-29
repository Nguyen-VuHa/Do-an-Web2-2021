import { create } from 'zustand';
import { ISeat } from '~/types/seat.type';

interface SeatState {
  setStateSeat: (key: string, value: any) => void;
  rowSeat: number;
  colSeat: number;

  seatMap: ISeat[];

  isChangeSeatNameModal: boolean;
  seatUpdate: ISeat | null;

  resetFormSeat: () => void;
}

const useSeatStore = create<SeatState>((set, get) => ({
  setStateSeat: (key, value) => {
    set({
      [key]: value,
    });
  },
  rowSeat: 0,
  colSeat: 0,

  seatMap: [],
  seatUpdate: null,
  isChangeSeatNameModal: false,

  resetFormSeat: () => {
    set({
      seatMap: [],
      rowSeat: 0,
      colSeat: 0,
    });
  },
}));

export default useSeatStore;
