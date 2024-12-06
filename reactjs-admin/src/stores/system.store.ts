import { create } from "zustand";
import { IUserInfo } from "~/types/user.type";


interface SystemState { 
    userInfo: IUserInfo | null,
    setUserInfo: (user: IUserInfo) => void;
} 


const useSystemStore = create<SystemState>((set) => ({ 
    userInfo: null,
    setUserInfo: (user: IUserInfo) => (set({
        userInfo: user,
    }))
}))

export default useSystemStore;