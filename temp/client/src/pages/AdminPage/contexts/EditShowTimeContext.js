import React, { createContext, useReducer } from 'react';

export const EditShowTimeContext = createContext();

export const EditShowTimeContextProvider = (props) => { 
    const initialState = {
        idCinema: '',
        idMovie: '',
        premiereDate: null,
        showTime: '',
        fare: 0,
    };

    const [stateShowtime, dispatchShowtime] = useReducer((state, action) => { 
        switch (action.type) { 
            case "SET_SHOW_TIME":
                return {
                    ...state,
                    showTime: action.payload,
                };
            case "SET_FARE_SHOW_TIME":
                return {
                    ...state,
                    fare: action.payload,
                };
            case "SET_ID_CINEMA":
                return {
                    ...state,
                    idCinema: action.payload,
                };
            case "SET_ID_MOVIE":
                return {
                    ...state,
                    idMovie: action.payload,
                };
            case "SET_PREMIERE_DATE":
                return {
                    ...state,
                    premiereDate: action.payload,
                };
            default:
                return state;
        }
    }, initialState);

    return (
        <EditShowTimeContext.Provider value={{stateShowtime, dispatchShowtime}}>
            { props.children }
        </EditShowTimeContext.Provider>
    )
}