import { IObject, IResponse, IResponsePagintaion } from '~/types/common.type';
import axiosInstance from './axios.config';
import { ICinema } from '~/types/cinema.type';

const MAIN_PATH = '/admin/cinema';

export const fetchCinemaList = async (
  params: IObject<any>,
): Promise<IResponse<IResponsePagintaion<ICinema[]>>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};
