import React, { createContext, useReducer } from 'react';
export const TrailerContext = createContext();

export const TrailerContextProvider = (props) => {
    const idChanel = {
        status: false,
        idChanel: '',
    };
    
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "SHOW_TRAILER":
                return action.payload;
            case "HIDEN_TRAILER":
                return {
                    status: false,
                    idChanel: '',
                };
            default:
                return state;
        }
    }, idChanel)

    return (
        <TrailerContext.Provider value={{state, dispatch}}>
            { props.children }
        </TrailerContext.Provider>
    )
}