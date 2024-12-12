import { IOject, IResponse, IResponsePagintaion } from '~/types/common.type';
import axiosInstance from './axios.config';
import { IDetailMovie, IMovie } from '~/types/movie.type';

const MAIN_PATH = '/admin/movie';

export const apiFetchMovieList = async (
  params: IOject<any>,
): Promise<IResponse<IResponsePagintaion<IMovie[]>>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};

export const apiFetchMovieDetail = async (
  params: IOject<any>,
): Promise<IResponse<IDetailMovie>> => {
  const path = MAIN_PATH + '/detail';
  return axiosInstance.get(path, { params });
};

export const apiCreateMovie = async (
  payload: IOject<any>,
): Promise<IResponse<IMovie>> => {
  const path = MAIN_PATH + '/create';
  return axiosInstance.post(path, payload);
};

export const apiUpdateMovie = async (
  payload: IOject<any>,
): Promise<IResponse<IMovie>> => {
  const path = MAIN_PATH + `/update/${payload.movie_id}`;
  return axiosInstance.put(path, payload);
};

export const apiChangeStatusMovie = async (
  params: IOject<any>,
): Promise<IResponse<string>> => {
  const path = MAIN_PATH + '/status';
  return axiosInstance.put(path, {}, { params });
};
