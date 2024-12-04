import React, { createContext, useReducer } from 'react';

export const LoadingContext = createContext();

export const LoadingContextProvider = (props) => {
    const isLoading = null;

    const [stateLoading, dispatchLoading] = useReducer((state, action) => {
        switch (action.type) {
            case "SHOW_LOADING":
                return true;
            case "HIDEN_LOADING":
                return false;
            case "DEFAULT_VALUE":
                return null;
            default:
                return state;
        }
    }, isLoading)

    return (
        <LoadingContext.Provider value={{stateLoading, dispatchLoading}}>
            { props.children }
        </LoadingContext.Provider>
    )
}