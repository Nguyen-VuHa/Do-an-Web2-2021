import { GrayWhite, Green } from "src/contants/cssContants";
import styled from "styled-components";

export const Text = styled.div`
    font-size: 16px;
    font-family: 'Roboto';
    color: ${GrayWhite};

    ${'' /* Font Weight Customs */}
    &.fw-300 {
        font-weight: 300 !important;
    }
    &.fw-400 {
        font-weight: 400 !important;
    }
    &.fw-500 {
        font-weight: 500 !important;
    }
    &.fw-600 {
        font-weight: 600 !important;
    }
    &.fw-bold {
        font-weight: bold !important;
    }

    ${'' /* Color Text Customs */}
    &.txt-green {
        color: ${Green} !important;
    }

    ${'' /* Font Size Text Custome */}
    &.font-params {
        font-size: ${props => props.fontSize}px !important; 
    }

    ${'' /* Custome Front Family */}

    &.fml-baloo-tammudu-2 {
        font-family: 'Baloo Tammudu 2';
    }
`;
