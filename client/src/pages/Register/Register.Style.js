import styled from 'styled-components';
import { BlueGray, FontEncodeSans, FontRoboto, Gray, Green, YellowGray } from 'src/contants/cssContants';

export const LayoutRegister = styled.div`
    background: ${BlueGray};
    width: 100%;
    min-height: 100vh;
    height: auto;
`;

export const Title = styled.h3`
    text-align: center;
    padding: 30px 0;
    color: ${Green};
    font-size: 35px;
    font-family: ${FontEncodeSans};
    font-weight: 600;
`;

export const TitleForm = styled(Title)`
    font-size: 24px;
    font-family: ${FontRoboto};
    text-transform: uppercase;
    color: ${YellowGray};
    padding: 0;
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;

    @media screen and (max-width: 764px) {  
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;

export const LayoutFormRegister = styled.div`
    position: relative;
    max-width: 500px;
    width: 100%;
    height: 450px auto;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.125);
    padding: 30px;
    background: ${Gray};
    border-radius: 10px;
    margin: 0px 20px;
    margin-bottom: 20px;

    @media screen and (max-width: 764px) {  
        max-width: 100%;
        margin: 0;
    }
`;