import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { IUserInfo } from "~/types/user.type";

export const apiFetchUserInfo = async (): Promise<IResponse<IUserInfo>> => {
  const path = "/user/info";
  return axiosInstance.get(path);
};

export const apiUpdateUserInfo = async (payload: any): Promise<IResponse<boolean>> => {
  const path = "/user/update";
  return axiosInstance.put(path, payload);
};
