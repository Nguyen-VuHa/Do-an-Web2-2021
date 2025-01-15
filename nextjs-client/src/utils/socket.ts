import { io, Socket } from "socket.io-client";
import { apiGetCookieAccessToken, apiRefreshToken } from "~/apis/auth.api";
import { SOCKER_RECONNECT, SOCKET_REFRESH_TOKEN } from "~/constants/socket";
import { STATUS_SUCCESS } from "~/constants/status";

// Định nghĩa kiểu cho socket.auth
interface SocketAuth {
  token: string;
}

export const connectSocket = async (): Promise<Socket | undefined> => {
  try {
    // Fetch token từ API
    const accessToken = await apiGetCookieAccessToken();

    // Kết nối đến server Socket.IO với token
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: {
        token: accessToken, // Gửi token lấy từ API
      } as SocketAuth,
    });

    // Lắng nghe sự kiện yêu cầu refresh token từ server
    socket.on(SOCKET_REFRESH_TOKEN, async () => {
      const response = await apiRefreshToken(); // Lấy refresh token từ next server

      if (response.statusCode === STATUS_SUCCESS) {
        (socket.auth as SocketAuth).token = response.data?.access_token; // Cập nhật token mới vào socket
      }
      socket.emit(SOCKER_RECONNECT); // Gửi lại sự kiện reconnect để tiếp tục
    });

    return socket;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
