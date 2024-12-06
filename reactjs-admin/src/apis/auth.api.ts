import { IPayloadSignIn, IResponseSignIn } from '~/types/auth.type';
import axiosInstance from './axios.config';
import { IResponse } from '~/types/common.type';

const URL_PATH = '/admin/auth';

export const signInAccount = async (payload: IPayloadSignIn): Promise<IResponse<IResponseSignIn>> => {
  let url = URL_PATH + '/sign-in';
  return axiosInstance.post(url, payload);
};
