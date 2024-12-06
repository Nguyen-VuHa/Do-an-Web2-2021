import axiosInstance from './axios.config';

const URL_PATH = '/admin/auth';

export const signInAccount = async (payload: any) => {
  let url = URL_PATH + '/sign-in';
  return axiosInstance.post(url, payload);
};
