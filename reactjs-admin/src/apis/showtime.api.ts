import { IObject, IResponse, IResponsePagintaion } from '~/types/common.type';
import { IShowtime } from '~/types/showtime.type';
import axiosInstance from './axios.config';

const MAIN_PATH = '/admin/showtime';

export const fetchShowtimeList = async (
  params: IObject<any>,
): Promise<IResponse<IResponsePagintaion<IShowtime[]>>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};

export const fetchShowtimeDetail = async (
  showtime_id: string,
): Promise<IResponse<IShowtime>> => {
  const path = MAIN_PATH + `/detail/${showtime_id}`;
  return axiosInstance.get(path);
};

export const apiCreateShowtime = async (
  payload: IObject<any>,
): Promise<IResponse<IShowtime>> => {
  const path = MAIN_PATH + '/create';
  return axiosInstance.post(path, payload);
};

export const apiUpdateShowtime = async (
  payload: IObject<any>,
): Promise<IResponse<IShowtime>> => {
  const path = MAIN_PATH + '/update';
  return axiosInstance.put(path, payload);
};

export const apiUpdateStatusShowtime = async (
  params: IObject<any>,
): Promise<IResponse<string>> => {
  const path = MAIN_PATH + '/status';
  return axiosInstance.put(path, {}, { params });
};
