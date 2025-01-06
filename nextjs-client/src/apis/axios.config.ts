import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getDataToLocalStore,
  removeDataToLocalStore,
} from "~/utils/localStorage";
import { parse } from "cookie"; // Thư viện parse cookie
import Cookies from "js-cookie"; // Thư viện dùng trên client

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
  (config: InternalAxiosRequestConfig) => {
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
      const token = Cookies.get("access_token");
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

const handleForbidden = () => {
  removeDataToLocalStore("accessToken,refreshToken");
  window.location.replace("/");
};

const handleRefreshToken = async (): Promise<string> => {
  try {
    const currentRefreshToken = getDataToLocalStore("refreshToken"); // Lấy refresh token từ localStorage
    if (!currentRefreshToken) {
      throw new Error("No refresh token found");
    }

    const accessToken = "";
    // Gửi request để refresh token
    //   const response = await apiRefreshToken(currentRefreshToken);

    //   if (response.statusCode === 200) {
    //     accessToken = response.data as string;
    //     setDataToLocalStore('accessToken', accessToken);
    //   }

    return accessToken;
  } catch (error: unknown) {
    throw new Error(error?.toString());
  }
};

export default axiosInstance;
