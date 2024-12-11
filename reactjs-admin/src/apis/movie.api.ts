import { IOject, IResponse } from '~/types/common.type';
import axiosInstance from './axios.config';
import { IMovie } from '~/types/movie.type';

const MAIN_PATH = '/admin/movie';

export const apiFetchMovieList = async (
  params: IOject<any>,
): Promise<IResponse<any>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};

export const apiCreateMovie = async (
  payload: IOject<any>,
): Promise<IResponse<IMovie>> => {
  const path = MAIN_PATH + '/create';
  return axiosInstance.post(path, payload);
};
