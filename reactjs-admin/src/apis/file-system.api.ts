import { IOject, IResponse } from '~/types/common.type';
import axiosInstance from './axios.config';
import { IFileSystem } from '~/types/file-system.type';

const MAIN_PATH = '/admin/file-system';

export const apiFetchFileSystem = async (
  params: IOject<string>,
): Promise<IResponse<IFileSystem[]>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};
