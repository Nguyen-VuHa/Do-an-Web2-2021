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
