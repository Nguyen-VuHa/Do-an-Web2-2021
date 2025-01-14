import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { IBookingTicketForm } from "~/types/booking.type";

export const apiBookingTicket = async (
  data: IBookingTicketForm,
): Promise<IResponse<string>> => {
  const path = "/booking/ticket";
  return axiosInstance.post(path, data);
};
