import { IResponse } from '~/types/common.type';
import axiosInstance from './axios.config';
import { BodyCreateCategory, Category } from '~/types/movie-meta.type';

const MAIN_PATH = '/admin/category';

export const fetchAllCategories = async (): Promise<IResponse<Category[]>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path);
};

export const apiCreateCategory = async (
  payload: BodyCreateCategory,
): Promise<IResponse<Category>> => {
  const path = MAIN_PATH + '/create';

  return axiosInstance.post(path, payload);
};
