import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getDataToLocalStore } from '~/utils/localStorage';

// Tạo một instance của Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL từ biến môi trường
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Bạn có thể thêm token vào headers nếu cần
    const token = getDataToLocalStore('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi trước khi request được gửi
    return Promise.reject(error);
  },
);

// Thêm interceptor cho response
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Xử lý response thành công
    return response.data;
  },
  (error) => {
    // Xử lý lỗi từ server hoặc lỗi khác
    if (error.response) {
      return Promise.resolve(error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
