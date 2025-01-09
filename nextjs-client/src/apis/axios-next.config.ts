import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Tạo một instance của Axios
const axiosNextInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONT_END_URL, // URL từ biến môi trường
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho request
axiosNextInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    // Xử lý lỗi trước khi request được gửi
    return Promise.reject(error);
  },
);

// Thêm interceptor cho response
axiosNextInstance.interceptors.response.use(
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

export default axiosNextInstance;
