import { IObject, IResponse, IResponsePagintaion } from '~/types/common.type';
import { IScreen } from '~/types/screen.type';
import axiosInstance from './axios.config';

const MAIN_PATH = '/admin/screen';

export const fetchScreenList = async (
  params: IObject<any>,
): Promise<IResponse<IResponsePagintaion<IScreen[]>>> => {
  const path = MAIN_PATH + '/list';
  return axiosInstance.get(path, { params });
};
