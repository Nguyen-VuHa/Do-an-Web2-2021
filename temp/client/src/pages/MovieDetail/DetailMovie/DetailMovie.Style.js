import styled from 'styled-components';
import { FontEncodeSans, FontBalooTammudu2, Green, GrayWhite, FontRoboto } from 'src/contants/cssContants';

export const LayoutDetailMovie = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    
    @media screen and (max-width: 768px) {  
        margin: 0;
    }
`;

export const TitleMovieName = styled.h4`
    color: crimson;
    font-size: 2.2rem;
    margin: 0 40px;
    margin-bottom: 50px;
    font-family: ${FontEncodeSans};
    font-weight: 600;

    @media screen and (max-width: 768px) {  
        margin: 30px 20px;
        font-size: 1.9rem;
        text-align: center;
    }
`;

export const InfoMovie = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.2em;
    font-family: ${FontBalooTammudu2};

    @media screen and (max-width: 768px) {  
        padding: 0 15px;
    }
`;

export const GroupInfo = styled.li`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-left: 120px;
    padding-bottom: 2rem;

    span {
        font-weight: 500;
        color: ${GrayWhite};
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
    color: ${Green};
`;