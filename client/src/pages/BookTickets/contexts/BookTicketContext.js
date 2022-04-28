import React, { createContext, useReducer } from 'react';

export const BookTicketContext = createContext();

export const BookTicketContextProvider = (props) => { 
    const initialState = {
        mySeat: [],
        seatSelected: [],
        holdingTime: 300,
        paymentType: null,
    };

    const [stateBookTicket, dispatchBookTicket] = useReducer((state, action) => { 
        switch (action.type) { 
            case "SET_SEATS_SELECTED":
                return {
                    ...state,
                    seatSelected: state.seatSelected.concat(action.payload),
                };
            case "SET_PAYMENT_TYPE":
                return {
                    ...state,
                    paymentType: action.payload,
                };
            case "SET_HOLDING_TIME":
                return {
                    ...state,
                    holdingTime: action.payload,
                };
            case "REMOVE_MY_SEATS":
                return {
                    ...state,
                    mySeat: state.mySeat.filter(ms => ms !== action.payload),
                };
            case "SET_MY_SEATS":
                return {
                    ...state,
                    mySeat: state.mySeat.concat(action.payload),
                };
            case "CLEAR_BOOK_TICKET":
                return initialState;
            default:
                return state;
        }
    }, initialState);

    return (
        <BookTicketContext.Provider value={{stateBookTicket, dispatchBookTicket}}>
            { props.children }
        </BookTicketContext.Provider>
    )
}