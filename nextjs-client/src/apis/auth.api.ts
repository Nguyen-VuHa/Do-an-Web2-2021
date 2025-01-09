import { ISignInPayload, ISignUpPayload } from "~/types/auth.type";
import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import axios from "axios";

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
  try {
    const path = "/auth/sign-in";
    const response = await axios.post(
      process.env.NEXT_PUBLIC_FRONT_END_URL + path,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Nếu lỗi đến từ response (status khác 200)
      return error.response.data;
    }

    return error;
  }
};
