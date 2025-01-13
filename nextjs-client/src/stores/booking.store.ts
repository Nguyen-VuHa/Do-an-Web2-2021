import { create } from "zustand";
import { ISeatBooking } from "~/types/booking.type";

interface BookingState {
  setStateBooking: (key: string, value: unknown) => void;
  seatBooking: ISeatBooking[];
  processBooking: number; // 1: chọn ghế, 2. Thanh toán, 3. Thành công.
}

export const useBookingStore = create<BookingState>((set) => ({
  setStateBooking: (key, value) => {
    set({
      [key]: value,
    });
  },

  seatBooking: [],
  processBooking: 1,
}));
