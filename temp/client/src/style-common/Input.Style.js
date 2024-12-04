import styled from 'styled-components';
import { GrayWhite } from 'src/contants/cssContants';

export const InputForm = styled.input`
    width: 100%;
    padding: 0 15px;
    font-size: 15px;
    color: ${GrayWhite};
    line-height: 36px;
    border: none;
    outline: none;
    background: #273245;
    border-radius: 4px;

    &::placeholder {
        color: ${GrayWhite};
    }
`;