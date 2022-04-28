import { BlueGray, FontBalooTammudu2, FontRoboto, GrayWhite, YellowLight } from "src/contants/cssContants";
import styled from "styled-components";

export const LayoutBasicInfo = styled.div`
    width: 100%;
    height: auto;
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
    font-size: 1em;
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
    padding-left: 100px;
    padding-bottom: 1.5rem;

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

export const ItemTableCustom = styled.li`
    cursor: pointer;

    display: flex;
    justify-content: start;
    align-items: center;

    padding: 8px 5px;
    padding-left: 15px;

    color: ${BlueGray};

    border-radius: 6px;
    transition: all .35s ease;
    
    & i {
        margin-right: 8px;
    }

    &:hover, &.active {
        background: ${YellowLight};
    }
`;