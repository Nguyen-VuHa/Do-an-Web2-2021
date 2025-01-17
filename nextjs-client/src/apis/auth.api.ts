import { ISignInPayload, ISignUpPayload } from "~/types/auth.type";
import { IResponse } from "~/types/common.type";
import axiosNextInstance from "./axios-next.config";
import axiosInstance from "./axios.config";

export const apiSignUpAccount = async (
  payload: ISignUpPayload,
): Promise<IResponse<any>> => {
  const path = "/auth/sign-up";
  return axiosInstance.post(path, payload);
};

export const apiSignInAccount = async (
  payload: ISignInPayload,
): Promise<IResponse<any>> => {
  const path = "/auth/sign-in";
  return axiosInstance.post(path, payload);
};

export const apiSignInAccountNextServer = async (
  payload: ISignInPayload,
): Promise<IResponse<any>> => {
  const path = "/auth/sign-in";
  return axiosNextInstance.post(path, payload);
};

export const apiGetCookieAccessToken = async (): Promise<string> => {
  const path = "/cookies";
  return axiosNextInstance.get(path);
};

export const apiSignOutAccount = async (): Promise<string> => {
  const path = "/auth/sign-out";
  return axiosNextInstance.post(path);
};

export const apiRefreshToken = async (): Promise<IResponse<any>> => {
  const path = "/auth/token/refresh";
  return axiosNextInstance.post(path);
};

export const apiVerifyAccount = async (
  payload: any,
): Promise<IResponse<any>> => {
  const path = "/auth/verify";
  return axiosInstance.post(path, payload);
};
