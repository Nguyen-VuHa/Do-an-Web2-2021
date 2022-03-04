import { GrayWhite } from 'src/contants/cssContants';
import styled from 'styled-components';


export const Divider = styled.div`
    width: 100%;
    height: 2px;

    margin: 10px 0;
    background: ${GrayWhite};
`;

export const FormGroup = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;


    &.flex-column {
        flex-direction: column !important;
        justify-content: start !important;
        align-items: start;
    }
`;