import { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketState {
  socket: Socket | null; // Kiểu Socket hoặc null nếu chưa kết nối
  setSocket: (newSocket: Socket) => void; // Action để lưu socket
}

const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  setSocket: (newSocket: Socket) => set({ socket: newSocket }),
}));

export default useSocketStore;
