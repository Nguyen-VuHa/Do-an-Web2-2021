import { FontPacifico, Green } from "src/contants/cssContants";
import styled from "styled-components";

export const Layout = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
`;

export const TitleCinema = styled.h2`
    width: 100%;
    padding: 40px 0;

    text-align: center;
    font-size: 50px;
    color: ${Green};
    font-family: ${FontPacifico};
    line-height: 1;
    margin: 0;
    font-weight: normal;
    letter-spacing: 0.5rem;
    transform: translateZ(0) translate(0,0);
    animation: floating 6s ease-in-out infinite;
    text-shadow: 1px 5px 4px rgba(0,0,0,.3), 
                0 0 2px rgba(255,255,255,0.2), 
                0 0 10px rgba(255,255,255,0.9), 
                0 0 20px rgba(255,255,255,0.5), 
                0 0 30px rgba(255,255,255,0.8), 
                0 0 40px ${Green}, 
                0 0 70px ${Green};

    @media screen and (max-width: 764px) {  
        font-size: 40px;
        letter-spacing: 0.35rem;
    }

    @media screen and (max-width: 600px) {  
        font-size: 25px;
        letter-spacing: 0.2rem;
        padding: 20px 0;
    }
`;