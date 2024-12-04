import { BlueGray, FontBalooTammudu2, FontRoboto, Gray, GrayWhite, Green, RedError, White, YellowGray, YellowLight } from "src/contants/cssContants";
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
    width: 40px;
    flex-shrink: 0;

    color: ${Green};
`;

export const Seat = styled.div`
    flex-shrink: 0;
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
    margin-left: 30px;
`;

export const GroupBoxMovie = styled.div`
    width: 100%;
    background: ${GrayWhite};
    border-radius: 8px;
    padding: 12px;
`;

export const PhotoMovie = styled.div`
    flex-shrink: 0;
    width: 150px;
    height: 100%;
    
`;

export const InfoMovie = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.8em;
    font-family: ${FontBalooTammudu2};
    padding-left: 10px;

    @media screen and (max-width: 768px) {  
        padding: 0 15px;
    }
`;

export const GroupInfo = styled.li`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-left: 65px;
    padding-bottom: 1rem;

    span {
        font-weight: 500;
        color: ${BlueGray};
    }

    &.group-control {
        margin-top: 30px;
        display: flex;
    }

    button {
        font-family: ${FontRoboto};
        font-size: 18px;
        font-weight: 600;
    }
`;

export const LabelInfo = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    font-weight: 600;
    color: ${YellowLight};
`;