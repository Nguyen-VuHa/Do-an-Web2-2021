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
