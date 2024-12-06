import { IResponse } from '~/types/common.type';
import axiosInstance from './axios.config';

const MAIN_PATH = '/admin/user';

export const fetchUserInfo = async (): Promise<IResponse<any>> => {
  const path = MAIN_PATH + '/info';
  return axiosInstance.get(path);
};
