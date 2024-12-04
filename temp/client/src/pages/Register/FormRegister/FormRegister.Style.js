import styled from 'styled-components';
import { GrayWhite } from 'src/contants/cssContants';

export const LayoutForm = styled.form`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: auto;
`;

export const FormGroup = styled.div`
    ${'' /* position: relative; */}
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 764px) {  
        flex-direction: column;
        align-items: start;
    }
`;

export const TitleLabel = styled.label`
    width: 180px;
    color: ${GrayWhite};
    margin-right: 10px;
    font-size: 14px;
`;

export const TextMessage = styled.small`
    display: none;
    ${'' /* position: absolute;
    left: 30%;
    bottom: -50%; */}

    &.show {
        display: block;
    }
`;