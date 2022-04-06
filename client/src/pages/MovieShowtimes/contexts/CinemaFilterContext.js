import React, { createContext, useReducer } from 'react';

export const CinemaFilterContext = createContext();

export const CinemaFilterContextProvider = (props) => { 
    const cinemaFilter = {
        placeSelect: 'ALL',
        cinemaSelect: '',
        nameCinemaSelect: '',
    };

    const [stateFilter, dispatchFilter] = useReducer((state, action) => { 
        switch (action.type) { 
            case 'SET_CINEMA_SELECT': 
                return {
                    ...state,
                    cinemaSelect: action.payload.id,
                    nameCinemaSelect: action.payload.nameCinema
                }
            case 'SET_PLACE_SELECT': 
                return {
                    ...state,
                    placeSelect: action.payload,
                }
            default:
                return state;
        }
    }, cinemaFilter)

    return (
        <CinemaFilterContext.Provider value={{stateFilter, dispatchFilter}}>
            { props.children }
        </CinemaFilterContext.Provider>
    )
}