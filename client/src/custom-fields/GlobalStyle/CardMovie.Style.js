import { FontRoboto, Green } from 'src/contants/cssContants';
import styled from 'styled-components';

export const LayoutCard = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    border-radius: 5px;
    width: 220px;
    margin: 20px 10px; 

    cursor: pointer;
    overflow: hidden;
`;

export const CardImage = styled.div`
    width: 100%;
    height: 300px;

    img {
        object-fit: cover;
        object-position: top;
    }
`;

export const CardContent = styled.div`
    position: absolute;
    display:  flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    bottom: -160px;
    width: 100%;
    height: 140px;
   
    z-index: 10;
    
    backdrop-filter: blur(15px);
    box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);

    transition: bottom 0.3s;
    transition-delay: 0.5s;

    &.hover {
        bottom: 0px;
        transition-delay: 0s;

        h3 {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`;

export const ContentBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    text-align: center;

    top: 0;
    margin: 5px 0px;
    width: 100%;

    h3 {
        color: ${Green};
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 500;
        font-size: 15px;
        text-align: center;
        margin: 20px 0 15px;
        line-height: 1.1em;
        transition: 0.5s;
        opacity: 0;
        transform: translateY(-20px);
        transition-delay: 0.2s;
    }

    p {
        font-family: ${FontRoboto};
        color: ${Green};
        letter-spacing: 1px;
        font-weight: 500;
        font-size: 13px;
    }
`;

export const LayoutButton = styled.div`
    display: flex;
    width: 110%;
    position: absolute;
    bottom: 0;
    z-index: 10;

    a {
        margin: 0;
        width: 100%;
        color: #56ff1a;
        font-weight: bold;
        background: transparent;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

export const ButtonCard = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    
    padding: 10px 0;
`;
