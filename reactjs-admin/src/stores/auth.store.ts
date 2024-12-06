import { create } from "zustand";
import { signInAccount } from "~/apis/auth.api";
import { IPayloadSignIn } from "~/types/auth.type";
import { IOject } from "~/types/common.type";

interface AuthState {
    email: string;
    password: string;
    setInputChange: (newValue: IOject<string>) => void;
    setErrors: (newValue: IOject<string>) => void;
    errors: IOject<string> | null;

    isSignIn: boolean;
    reqSignIn: (payload: IPayloadSignIn) => Promise<any>;
}

const useAuthStore = create<AuthState>((set) => ({
    email: '',
    password: '',
    setInputChange: (newValues: IOject<string>) =>
        set((state) => ({
            ...state, // Giữ lại tất cả các giá trị cũ
            ...newValues, // Cập nhật các giá trị mới nếu có
        })
    ),
    setErrors: (newValues: IOject<string>) => set({ errors: newValues }),
    errors: null,

    isSignIn: false,
    reqSignIn: async (payload: IPayloadSignIn) => {
        set({isSignIn: true})
        try {
            const res = await signInAccount(payload)
            console.log(res);
        } catch (error) {
            console.log(error);
        } finally {
            set({isSignIn: false})
        }
    }
}))

export default useAuthStore;