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

export const fetchDetailCinemaBySlug = async (
  params: IObject<any>,
): Promise<IResponse<ICinema>> => {
  const path = MAIN_PATH + '/detail';
  return axiosInstance.get(path, { params });
};

export const apiCreateCinema = async (
  payload: IObject<any>,
): Promise<IResponse<ICinema>> => {
  const path = MAIN_PATH + '/create';
  return axiosInstance.post(path, payload);
};

export const apiUpdateCinema = async (
  slug: string,
  payload: IObject<any>,
): Promise<IResponse<ICinema>> => {
  const path = MAIN_PATH + `/update/${slug}`;
  return axiosInstance.put(path, payload);
};

export const apiDeleteCinema = async (
  slug: string,
): Promise<IResponse<string>> => {
  const path = MAIN_PATH + `/delete/${slug}`;
  return axiosInstance.delete(path);
};

export const apiUndoDeleteCinema = async (
  slug: string,
): Promise<IResponse<string>> => {
  const path = MAIN_PATH + `/undo-delete/${slug}`;
  return axiosInstance.put(path);
};
