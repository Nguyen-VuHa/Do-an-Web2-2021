import styled from 'styled-components';
import { BlueGray, FontBalooTammudu2, FontNotoSansMono, GrayWhite, Green } from 'src/contants/cssContants';

export const MovieDetailLayout = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;

    background-color: ${ BlueGray };
    height: auto;
    overflow: hidden;
`;


export const BreadcrumbLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 30px 0px;

    a, span {
        font-size: 25px;
        border-bottom: 1px solid transparent;
        font-family: ${FontBalooTammudu2};
        font-weight: 600;
        color: ${ GrayWhite };
        margin: 0;
        cursor: pointer;
    }

    span {
        margin: 0 10px;

        &:last-child {
            margin: 0;
        }
    }

    a:hover {
        color: ${Green};
    }

    @media screen and (max-width: 768px) {  
        a, span { 
            font-size: 20px;
        }
    }
`;

export const LayoutContent = styled.div`
    display: flex;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 768px) {  
        flex-direction: column;
    }
`;

export const LayoutSlidePoster = styled.div`
    width: 35%;
    height: 500px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 3px 10px ${BlueGray};

    @media screen and (max-width: 1024px) {  
        height: 450px;
    }

    @media screen and (max-width: 768px) {  
        width: 100%;
    }
`;

export const LayoutContentMovie = styled.div`
    width: 65%;
    height: 100%;

    @media screen and (max-width: 768px) {  
        width: 100%;
        margin-top: 15px;
    }
`;

export const DescriptionMovie = styled.div`
    width: 100%;
    margin-top: 100px;
    margin-bottom: 150px;
    z-index: 100;

    @media screen and (max-width: 768px) {  
        margin-top: 0;
    }
`;

export const TitleDescription = styled.h5`
    color: ${Green};
    text-transform: uppercase;
    font-weight: 600;
    font-size: 25px;
    text-align: center;
`;

export const TextDescription = styled.p`
    color: ${GrayWhite};
    white-space: pre-wrap;
    font-size: 17px;
    line-height: 2;
    font-family: ${FontNotoSansMono};
`;