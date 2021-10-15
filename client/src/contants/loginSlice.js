import { createSlice } from "@reduxjs/toolkit";

const isLoginSlice = createSlice({ 
    name: 'isLogin',
    initialState: false,
    reducers: {
        login: () => {
            return true;
        },
        logout: () => {
            return false;
        }
    },
});

const  { reducer, actions } = isLoginSlice;
export const { login, logout } = actions;
export default reducer;