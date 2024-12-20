import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Tạo một instance của Axios
const axiosInstanceCrawler: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_CRAWLER_URL, // URL từ biến môi trường
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor cho response
axiosInstanceCrawler.interceptors.response.use(
  (response: AxiosResponse) => {
    // Xử lý response thành công
    return response.data;
  },
  async (error: AxiosError) => {
    if (error.response) {
      return Promise.resolve(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstanceCrawler;
