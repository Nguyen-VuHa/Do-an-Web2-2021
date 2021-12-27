import React, { createContext, useReducer } from 'react';
export const TrailerContext = createContext();

export const TrailerContextProvider = (props) => {
    const idChanel = {
        status: false,
        idChanel: '',
    };
    
    const [stateTrailer, dispatchTrailer] = useReducer((state, action) => {
        switch (action.type) {
            case "SHOW_TRAILER":
                return {
                    status: true,
                    idChanel: action.payload,
                };
            case "HIDEN_TRAILER":
                return idChanel;
            default:
                return state;
        }
    }, idChanel)

    return (
        <TrailerContext.Provider value={{stateTrailer, dispatchTrailer}}>
            { props.children }
        </TrailerContext.Provider>
    )
}