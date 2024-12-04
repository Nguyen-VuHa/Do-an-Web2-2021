import styled from 'styled-components';
import { BlueGray } from 'src/contants/cssContants';

export const LayoutBackground = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: 0.3fr 0.7fr;

    width: 100%;
    height: 100%;
    max-height: 120vh;

    top: 0;
    left: 0;

    background-color: ${BlueGray};

    @media screen and (max-width: 764px) {  
        grid-template-columns: 0fr 1fr;
    }
`;

export const ImageBG = styled.div`
    background: url(${props => props.url}) 0% 0% / cover no-repeat;
    width: 100%;
    height: 100%;
    position: relative;
    transition: all 0.5s ease 0s;

    &::before {
        content: '';
        position: absolute;
        background: linear-gradient(90deg, ${BlueGray}, rgba(17,22,31, 0.3));
        width: 100%;
        height: 100%;
    }

    &::after {
        content: '';    
        position: absolute;
        background: linear-gradient(0deg, ${BlueGray}, rgba(17,22,31, 0.3));
        width: 100%;
        height: 100%;
        top: 0;
    } 
`;