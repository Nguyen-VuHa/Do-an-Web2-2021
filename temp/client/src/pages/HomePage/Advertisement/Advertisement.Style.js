import { FontEncodeSans, FontNotoSansMono, FontOpenSans, GrayWhite, Green } from 'src/contants/cssContants';
import styled from "styled-components";

export const Layout = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100vh;

    height: auto;
    overflow: hidden;
`;

export const Warapper = styled.div`
    display: flex;
    width: 100%;
    height: auto;
`;

export const WarapperContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
`;

export const Title_3 = styled.h3`
    width: 100%;
    font-family: ${FontEncodeSans};
    font-size: 40px;
    font-weight: 600;

    text-align: left;
    color: ${Green};

    margin: 40px 50px;

    @media screen and (max-width: 764px) {  
        font-size: 30px;
        text-align: center;
        margin: 10px 0;
        margin-top: 30px;
    }
`;

export const Title_4 = styled.h4`
    width: 100%;
    text-align: left;
    font-family: ${FontEncodeSans};
    font-size: 40px;
    font-weight: 600;

    color: ${Green};
    margin: 40px 50px;

    @media screen and (max-width: 764px) {  
        margin: 20px 0 !important;
    }
`;

export const ContentMovie = styled.div`
    display: flex;
    width: 100%;

    @media screen and (max-width: 764px) {  
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const PosterCard = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 300px;
    background-color: transparent;

    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
   
    margin: 20px 10px;
`;

export const Image = styled.img`
    width: 100%;
    height: 400px;

    object-fit: cover;
    object-position: top;

    @media screen and (max-width: 1024px) {  
        height: 100%;
    }

    @media screen and (max-width: 764px) {  
        height: 350px;
    }
`;

export const LayoutDetail = styled.div`
    display: flex;
    flex-direction: column;

    width: auto;
    margin-left: 10px;

    @media screen and (max-width: 764px) {  
        margin-left: 0;
    }
`;

export const DetailContent = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    
    font-size: 17px;
    font-family: ${FontOpenSans};

    @media screen and (max-width: 764px) {  
        padding: 10px;
    }
`;

export const DetailItem = styled.li`
    position: relative;
    display: flex;
    flex-direction: row;

    width: 100%;
    padding-left: 120px;
    padding-bottom: 1.5rem;

    span {
        color: ${GrayWhite};
    }
`;

export const DetailTitle = styled.label`
    position: absolute;

    font-weight: 500;
    color: ${Green};

    top: 0;
    left: 0;
    margin: 0;
`;

export const DescriptionMovie = styled.div`
    width: 100%;
    margin-top: 100px;
    margin-bottom: 150px;
    z-index: 100;

    @media screen and (max-width: 764px) {  
        margin-top: 0;
    }
`;

export const TitleDescription = styled.h5`
    color: ${Green};
    text-transform: uppercase;
    
    font-weight: 600;
    font-size: 2em;
    text-align: start;
`;

export const TextDiscription = styled.p`
    color: ${GrayWhite};
    white-space: pre-wrap;
    font-size: 17px;
    line-height: 2;
    font-family: ${FontNotoSansMono};
`;