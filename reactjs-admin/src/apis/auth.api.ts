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
