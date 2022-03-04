import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const refreshToken = localStorage.getItem('refreshToken');
    const userInfo = {
        id: '',
        email: '',
        fullname: '',
        role: '',
        avartar: '',
        numberOfNotify: 0,
        surplus: 0,
        isLogin: refreshToken ? true : false,
    };
    
    const [state, dispatchAuth] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_USER_INFO":
                return {
                    ...state,
                    ...action.payload,
                    id: action.payload.idUser,
                    isLogin: true,
                };
            case "SET_NUMBER_OF_NOTIFY":
                return {
                    ...state,
                    numberOfNotify: action.payload,
                };
            case "CLEAR_NUMBER_OF_NOTIFY":
                return {
                    ...state,
                    numberOfNotify: 0,
                };
            case "CLEAR_USER_INFO":
                return {
                    ...userInfo,
                    isLogin: false,
                };
            default:
                return state;
        }
    }, userInfo)

    return (
        <AuthContext.Provider value={{state, dispatchAuth}}>
            { props.children }
        </AuthContext.Provider>
    )
}