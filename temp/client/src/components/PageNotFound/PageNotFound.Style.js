import styled from 'styled-components';
import { BlueGray } from 'src/contants/cssContants';

export const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    min-height: 100vh;

    background: ${BlueGray};
    padding: 0;
`;

export const Row = styled.div`
    margin-top: 30px;
    width: 70%;
`;

export const PageContent = styled.div`
    position: absolute;
    bottom: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const Title = styled.h3`
    color: rgb(228, 145, 145);

    margin: 0;
    padding: 5px;

    font-size: 50px;
    font-weight: 600;
    font-family: 'Girassol', cursive;
`;

export const Text = styled.p`
    font-size: 18px;
    bottom: 15%;

    color: rgb(228, 145, 145);
`;

export const ButtonNotFound = styled.div`
    display: flex;
    flex: row;
    justify-content: center;

    width: 100%;

    a {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 30px;
        margin: 40px 30px;
        color: #03e9f4;
        font-size: 24px;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        transition: 0.5s;
        letter-spacing: 4px;
        -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);

        span {
            position: absolute;
            display: block;
        }

        span:nth-child(1)
        {
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent,#03e9f4);
            animation: animate1 1.5s linear infinite;
        }

        span:nth-child(2)
        {
            top: -100;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, transparent,#03e9f4);
            animation: animate2 1.5s linear infinite;
            animation-delay: 0.35s;
        }

        span:nth-child(3)
        {
            right: -100;
            bottom: 0;
            height: 2px;
            width: 100%;
            background: linear-gradient(270deg, transparent,#03e9f4);
            animation: animate3 1.5s linear infinite;
            animation-delay: 0.65s;
        }

        span:nth-child(4)
        {
            bottom: -100;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(360deg, transparent,#03e9f4);
            animation: animate4 1.5s linear infinite;
            animation-delay: 1s;
        }
    }

    a:hover {
        background: #03e9f4;
        color: #fff;
        box-shadow: 0 0 5px #03e9f4,
                    0 0 25px #03e9f4,
                    0 0 50px #03e9f4,
                    0 0 200px #03e9f4;
    }   
`;