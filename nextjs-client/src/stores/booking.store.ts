import { create } from "zustand";
import { apiBookingTicket } from "~/apis/booking.api";
import {
  PROCESS_ERROR,
  PROCESS_SUCCESS,
  STATUS_SUCCESS,
} from "~/constants/status";
import { IBookingTicketForm, ISeatBooking } from "~/types/booking.type";
import { IProcessToAPI } from "~/types/common.type";

interface BookingState {
  setStateBooking: (key: string, value: unknown) => void;
  seatBooking: ISeatBooking[];
  processBooking: number; // 1: chọn ghế, 2. Thanh toán, 3. Thành công.

  bookingToken: string;
  statusBooking: string;
  errorMessage: string;

  resetStateBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  setStateBooking: (key, value) => {
    set({
      [key]: value,
    });
  },

  seatBooking: [],
  processBooking: 1,
  bookingToken: "",
  statusBooking: "",
  errorMessage: "",

  resetStateBooking: () => {
    set({
      seatBooking: [],
      processBooking: 1,
      bookingToken: "",
      statusBooking: "",
      errorMessage: "",
    });
  },
}));

interface BookingAPIState {
  isPostBookingTicket: boolean;
  postBookingTicket: (data: IBookingTicketForm) => Promise<IProcessToAPI>;
}

export const useBookingAPIStore = create<BookingAPIState>((set) => ({
  isPostBookingTicket: false,
  postBookingTicket: async (data) => {
    const errorMsg: IProcessToAPI = {
      status: PROCESS_ERROR,
      message: "",
    };
    set({ isPostBookingTicket: true });
    try {
      const res = await apiBookingTicket(data);

      if (res && res.statusCode === STATUS_SUCCESS) {
        errorMsg.status = PROCESS_SUCCESS;
        errorMsg.message = res.message || "Đặt vé thành công.";
      } else {
        let messageError = res.message?.toString() || "Đặt vé thất bại.";

        if (res.data) {
          const seatExits = res.data as ISeatBooking[];
          useBookingStore.setState({
            seatBooking: useBookingStore
              .getState()
              .seatBooking.filter(
                (seatBook) =>
                  !seatExits.some(
                    (seatExists) => seatExists.seat_id === seatBook.seat_id,
                  ),
              ),
            processBooking: 1,
          });
          const seatName = seatExits.map((dt) => dt.seat_name);

          messageError = `Các ghế ở vị trí ${seatName.join(",")} đã có người đặt rồi. Vui lòng chọn tại ghế! Xin lỗi vị sự bất tiện này. `;
        }

        errorMsg.message = messageError;
      }
    } catch (error) {
      errorMsg.message = error?.toString() || "Đặt vé thất bại.";
    } finally {
      set({ isPostBookingTicket: false });
      return errorMsg;
    }
  },
}));
