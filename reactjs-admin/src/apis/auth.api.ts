import { IPayloadSignIn, IResponseSignIn } from '~/types/auth.type';
import axiosInstance from './axios.config';
import { IResponse } from '~/types/common.type';

const MAIN_PATH = '/admin/auth';

export const signInAccount = async (
  payload: IPayloadSignIn,
): Promise<IResponse<IResponseSignIn>> => {
  const path = MAIN_PATH + '/sign-in';
  return axiosInstance.post(path, payload);
};

export const apiRefreshToken = async (
  payload: string,
): Promise<IResponse<string>> => {
  const path = MAIN_PATH + '/refresh-token';

  const formData = new FormData();
  formData.append('token', payload);

  return axiosInstance.post(path, formData);
};
