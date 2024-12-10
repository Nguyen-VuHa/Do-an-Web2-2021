import { IResponse } from '~/types/common.type';
import { Actor, BodyCreateActor } from '~/types/movie-meta.type';
import axiosInstance from './axios.config';

const MAIN_PATH = '/admin/actor';

export const apiFetchAllActor = async (): Promise<IResponse<Actor[]>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path);
};

export const apiCreateActor = async (
  payload: BodyCreateActor,
): Promise<IResponse<Actor>> => {
  const path = MAIN_PATH + '/create';

  return axiosInstance.post(path, payload);
};
