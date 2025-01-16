import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { IBookingTicketForm, ISeatBooking } from "~/types/booking.type";

export const apiBookingTicket = async (
  data: IBookingTicketForm,
): Promise<IResponse<string | ISeatBooking[]>> => {
  const path = "/booking/ticket";
  return axiosInstance.post(path, data);
};
