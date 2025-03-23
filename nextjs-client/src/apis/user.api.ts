import { IResponse } from "~/types/common.type";
import {
  IDetailBookingHistory,
  IUpdatePhotoUserRequest,
  IUserAvatarList,
  IUserBookingHistory,
  IUserInfo,
} from "~/types/user.type";
import axiosInstance from "./axios.config";

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

export const apiGetUserAvatar = async (): Promise<
  IResponse<IUserAvatarList[]>
> => {
  const path = "/user/photo/avatar";
  return axiosInstance.get(path);
};

export const apiUploadAvatarUser = async (
  data: FormData,
): Promise<IResponse<IUserAvatarList>> => {
  const path = "/user/upload/avatar";
  return axiosInstance.post(path, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiUpdatePhotoUser = async (
  data: IUpdatePhotoUserRequest,
): Promise<IResponse<string>> => {
  const path = "/user/photo/update";
  return axiosInstance.put(path, data);
};
