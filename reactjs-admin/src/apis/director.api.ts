import { IResponse } from '~/types/common.type';
import { BodyCreateDirector, Director } from '~/types/movie-meta.type';
import axiosInstance from './axios.config';

const MAIN_PATH = '/admin/director';

export const apiFetchAllDirector = async (): Promise<IResponse<Director[]>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path);
};

export const apiCreateDirector = async (
  payload: BodyCreateDirector,
): Promise<IResponse<Director>> => {
  const path = MAIN_PATH + '/create';

  return axiosInstance.post(path, payload);
};
