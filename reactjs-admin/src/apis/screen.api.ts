import { IObject, IResponse, IResponsePagintaion } from '~/types/common.type';
import { IScreen } from '~/types/screen.type';
import axiosInstance from './axios.config';

const MAIN_PATH = '/admin/screen';

export const fetchScreenList = async (
  params: IObject<any>,
): Promise<IResponse<IResponsePagintaion<IScreen[]>>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};

export const fetchScreenDetail = async (
  screen_id: number,
): Promise<IResponse<IScreen>> => {
  const path = MAIN_PATH + `/detail/${screen_id}`;
  return axiosInstance.get(path);
};

export const fetchScreenType = async (): Promise<IResponse<string[]>> => {
  const path = MAIN_PATH + '/type';
  return axiosInstance.get(path);
};

export const apiCreateScreen = async (
  payload: IObject<any>,
): Promise<IResponse<IScreen>> => {
  const path = MAIN_PATH + '/create';
  return axiosInstance.post(path, payload);
};

export const apiUpdateScreen = async (
  payload: IObject<any>,
): Promise<IResponse<IScreen>> => {
  const path = MAIN_PATH + '/update';
  return axiosInstance.put(path, payload);
};

export const apiUpdateStatusScreen = async (
  params: IObject<any>,
): Promise<IResponse<IScreen>> => {
  const path = MAIN_PATH + '/status';
  return axiosInstance.put(path, {}, { params });
};
