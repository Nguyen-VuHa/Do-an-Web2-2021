import { BlueGray, Gray, GrayWhite, Green, YellowGray } from "src/contants/cssContants";
import styled from "styled-components";

// Seats
export const LayoutSeat = styled.div`
    width: 70%;
`;

export const Screen = styled.div`
    width: 100%;
    height: 45px;

    text-align: center;

    font-size: 1.7rem;
    color: ${BlueGray};
    background: ${GrayWhite};
`;

export const RowSeats = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 10px 0 0;
`;

export const SeatName = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-right: 15px;

    color: ${Green};
`;

export const Seat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    user-select: none;
    
    width: 35px;
    height: 35px;
    background: ${GrayWhite};
    color: ${GrayWhite};
    border: 1px solid transparent;

    transition: all .35s ease;
    margin: 2px;

    &:hover {
        background: ${BlueGray};
        border: 1px solid ${GrayWhite};
    }

    &.hover-none {
        background: ${GrayWhite};
        color: ${GrayWhite};
    }

    &.choose {
        background: ${BlueGray};
        color: ${YellowGray};
        border: 1px solid ${YellowGray};
        text-shadow: #fc0 2px 0 15px;
    }

    &.choosed {
        opacity: 0.7;
        cursor: no-drop;
        color: ${BlueGray};
    }

    &:nth-of-type(5) {
        margin-right: 1.7rem;
    }

    &:nth-last-of-type(4) {
        margin-left: 1.7rem;
    }
`;

export const LayoutSeatInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100$;

    
`;

export const SeatInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${GrayWhite};

    &.choose {
        color: ${YellowGray};
    }

`;
// Movie Info
export const LayoutMovieInfo = styled.div`
    width: 30%;
`;