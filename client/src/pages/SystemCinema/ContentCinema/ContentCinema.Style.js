import { Green, GrayWhite, FontRoboto, FontBalooTammudu2 } from 'src/contants/cssContants';
import styled from 'styled-components';

export const LayoutContent = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
    margin-top: 80px;

    @media screen and (max-width: 1024px) {  
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 764px) {  
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 600px) {  
        grid-template-columns: 1fr;
        margin-top: 30px;
        padding: 0 50px;
    }
`;

// Card Cinema
export const LayoutCard = styled.div`
    position: relative;
    width: 100%;
    height: 350px;
    cursor: pointer;
   
    border: 1px solid #224e23;

    span {
        display: block;
        position: absolute;
        background: ${Green};
    }

    span:nth-child(1) {
        left: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.5s;
    }

    &:hover span:nth-child(1) { 
        transform: scaleY(1);
        transform-origin: bottom;
        transition: transform 0.5s;
    }

    span:nth-child(2) {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s;
    }

    &:hover span:nth-child(2) { 
        transform: scaleX(1);
        transform-origin: left;
        transition: transform 0.5s;
    }

    span:nth-child(3) {
        right: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.5s;
        transition-delay: 0.5s;
    }

    &:hover span:nth-child(3) { 
        transform: scaleY(1);
        transform-origin: bottom;
        transition: transform 0.5s;
        transition-delay: 0.5s;
    }

    span:nth-child(4) {
        left: 0;
        top: 0;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s;
        transition-delay: 0.5s;
    }

    &:hover span:nth-child(4) { 
        transform: scaleX(1);
        transform-origin: left;
        transition: transform 0.5s;
        transition-delay: 0.5s;
    }
`;

export const ContentCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 15px;
`;

export const Logo = styled.div`
    width: 80px;
    height: 80px;

    img {
        width: 100%;
        height: 100%;
    }
`;

export const NameCinema = styled.div`
    margin-top: 20px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    font-family: ${FontBalooTammudu2};
    color: #8eff66;
`;

export const InfoCinema = styled.ul`
    position: absolute;
    bottom: 10%;
    list-style: none;
    width: 100%;
    color: ${GrayWhite};
    font-family: ${FontRoboto};
    font-weight: 600;
    margin: 0;
    padding: 0;
    margin-top: 15px;
    z-index: 0;

    li {
        width: 100%;
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
        z-index: 0;
    }

    li ~ li {
        margin-top: 10px;
    }
`;