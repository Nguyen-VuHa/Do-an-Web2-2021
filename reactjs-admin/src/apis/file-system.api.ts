import { IObject, IResponse } from '~/types/common.type';
import { IFileSystem, IFileSystemResponse } from '~/types/file-system.type';
import axiosInstance from './axios.config';

const MAIN_PATH = '/admin/file-system';

export const apiFetchFileSystem = async (
  params: IObject<string>,
): Promise<IResponse<IFileSystemResponse>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};

export const apiUploadFileSystem = async (
  data: FormData,
): Promise<IResponse<IFileSystem>> => {
  const path = MAIN_PATH + '/upload';
  return axiosInstance.post(path, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const apiRenameFileSystem = async (
  payload: IObject<string>,
  id: string,
): Promise<IResponse<IFileSystemResponse>> => {
  const path = MAIN_PATH + `/rename/${id}`;
  return axiosInstance.put(path, payload);
};
