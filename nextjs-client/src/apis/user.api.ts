import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import {
  IDetailBookingHistory,
  IUserBookingHistory,
  IUserInfo,
} from "~/types/user.type";

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

export const apiGetDetailBookingHistory = async (
  payload: string,
  accessToken: string,
): Promise<IResponse<IDetailBookingHistory>> => {
  const path = `/user/booking-history/${payload}`;
  return axiosInstance.get(path, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
