import { ISignUpPayload } from "~/types/auth.type";
import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";

export const apiSignUpAccount = async (
  payload: ISignUpPayload,
): Promise<IResponse<unknown>> => {
  const path = "/auth/sign-up";
  return axiosInstance.post(path, payload);
};
