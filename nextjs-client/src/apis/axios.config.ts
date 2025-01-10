import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { parse } from "cookie"; // Thư viện parse cookie
import { STATUS_SUCCESS } from "~/constants/status";
import {
  apiGetCookieAccessToken,
  apiRefreshToken,
  apiSignOutAccount,
} from "./auth.api";

// Tạo một interface mở rộng từ AxiosRequestConfig để thêm thuộc tính _retry
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Thêm thuộc tính _retry
}

// Tạo một instance của Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL từ biến môi trường
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") {
      // Chạy trên server
      if (config.headers && config.headers.cookie) {
        const cookies = parse(config.headers.cookie);
        const token = cookies.access_token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } else {
      // Chạy trên client
      const token = await apiGetCookieAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Nếu mã lỗi là 401 và request chưa được thử lại
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Đánh dấu request đã thử lại

      try {
        const newAccessToken = await handleRefreshToken(); // Lấy access token mới

        if (originalRequest.headers) {
          originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`; // Cập nhật header với access token mới
        }

        // Gửi lại request ban đầu với access token mới
        return axiosInstance(originalRequest);
      } catch (err) {
        // Nếu refresh token thất bại, bạn có thể xử lý logout hoặc điều hướng người dùng
        console.error("Refresh token failed:", err);
        return Promise.reject(err); // Trả về lỗi cho request
      }
    }
    // Xử lý lỗi từ server hoặc lỗi khác
    if (error.response) {
      // Kiểm tra nếu mã lỗi là 403
      if (error.response.status === 403) {
        handleForbidden();
        return;
      }

      return Promise.resolve(error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  },
);

const handleForbidden = async () => {
  await apiSignOutAccount();
  window.location.replace("/");
};

const handleRefreshToken = async (): Promise<string> => {
  try {
    const response = await apiRefreshToken(); // Lấy refresh token từ next server

    if (response.statusCode !== STATUS_SUCCESS) {
      throw new Error("No refresh token found");
    }

    return response.data?.access_token;
  } catch (error: unknown) {
    throw new Error(error?.toString());
  }
};

export default axiosInstance;
