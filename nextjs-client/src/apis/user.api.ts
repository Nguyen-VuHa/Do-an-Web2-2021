import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { IUserBookingHistory, IUserInfo } from "~/types/user.type";

export const apiFetchUserInfo = async (): Promise<IResponse<IUserInfo>> => {
  const path = "/user/info";
  return axiosInstance.get(path);
};

export const apiUpdateUserInfo = async (
  payload: any,
): Promise<IResponse<boolean>> => {
  const path = "/user/update";
  return axiosInstance.put(path, payload);
};

export const apiGetBookingHistory = async (): Promise<
  IResponse<IUserBookingHistory[]>
> => {
  const path = "/user/booking-history";
  return axiosInstance.get(path);
};
