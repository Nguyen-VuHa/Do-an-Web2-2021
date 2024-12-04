import styled from 'styled-components';
import { BlueGray, FontEncodeSans, FontNotoSansMono, GrayWhite, Green, YellowGray } from 'src/contants/cssContants';

export const Layout = styled.div`
    width: 100%;
    height: auto;
    position: relative;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: auto;
    min-height: 90vh;
    margin-top: 30px;
    border-radius: 5px;
    background-color: ${BlueGray};
    color: ${GrayWhite};
`;

export const Heading = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & a i {
        position: absolute;
        left: 0;
        top: 20px;
        margin: 1rem;
        font-size: 38px;
        color: ${Green};
    }

    & a:hover i {
        text-shadow: 0 0 5px ${Green}, 0 0 25px ${Green}, 0 0 50px ${Green}, 0 0 200px ${Green};
    }

    @media screen and (max-width: 600px) {  
        & a i {
            position: absolute;
            left: -20px;
            top: 15px;
            margin: 1rem;
            font-size: 30px;
        }
    }
`;

export const Title = styled.h3`
    display: inline-block;
    margin-top: 25px;
    font-size: 40px;
    font-family: ${FontEncodeSans};
    font-weight: 600;
    text-align: center;
    color: ${Green};
    text-shadow: 0 0 5px ${Green}, 0 0 25px ${Green}, 0 0 50px ${Green}, 0 0 200px ${Green};
    font-weight: 600;
    cursor: pointer;

    @media screen and (max-width: 600px) {  
        font-size: 30px;
    }
`;

export const GridContent = styled.div`
    width: 100%;
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;

    @media screen and (max-width: 764px) {  
        grid-template-columns: 1fr;
    }
`;

export const DetailContent = styled.div`
    position: relative;
    width: 100%;
`;

export const NameCinema = styled.h4`
    font-family: ${FontEncodeSans};
    font-size: 22px;
    margin-bottom: 1rem;
    text-shadow: 0 0 5px ${Green}, 0 0 20px ${Green}, 0 0 40px ${Green}, 0 0 100px ${Green};
`;

export const Light = styled.div`
    position: relative;
    max-width: 60%;
    height: 30px;
    background-color: rgba(166, 178, 201, 0.5);
    transform: skew(20deg);
    z-index: 1;
    margin-bottom: 60px;

    @media screen and (max-width: 764px) {  
        max-width: 66%;
    }
`;

export const LightEffect = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const LightLeft = styled.div`
    position: absolute;
    width: 10%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${Green};
    opacity: 0.8;
    animation: animateLeft 5s linear infinite;
    z-index: 0;
`;

export const LightTop = styled.div`
    position: absolute;
    width: 10%;
    height: 100%;
    top: 0;
    right: -10%;
    background-color: ${GrayWhite};
    opacity: 0.3;
    animation: animateRight 4s linear infinite 2s;
    z-index: 0;
`;

export const SpanTitle = styled.span`
    position: absolute;
    top: 2px;
    left: 10px;
    color: ${ YellowGray };
    transform: skew(340deg);
    font-weight: bold;
    font-family: ${FontNotoSansMono};
    z-index: 1;
`;

export const DetailText = styled.div`
    position: absolute;
    transform: skew(340deg);
    top: 105%;
    left: -3%;
    width: 150%;
    height: auto;
    border: 2px solid  ${YellowGray};
    min-height: 55px;
    color: ${GrayWhite};
`;

export const GoogleMapLayout = styled.div`
    width: auto;
    height: 100%;

    @media screen and (max-width: 764px) {  
        height: 300px;
    }
`;

export const MapContent = styled.div`
    width: 100%;
    height: 100%;

    .maps__info {
        margin-bottom: 0;
        margin: 0;
        padding: 5px 10px;
        font-weight: 400;

        li {
            font-weight: bold;
            margin-bottom: 8px;
            font-weight: 400;

            &:nth-child(1) {
                color: ${GrayWhite};
            }
        }
    }
`;

export const BannerTicket = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 500px;

    img {
        object-fit: fill;
    }

    @media screen and (max-width: 764px) {  
        height: 350px;
    }

    @media screen and (max-width: 600px) {  
        height: 250px;
    }
`;