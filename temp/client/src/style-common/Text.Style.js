import { BlueGray, GrayWhite, Green, YellowGray, RedError, YellowLight } from "src/contants/cssContants";
import styled from "styled-components";

export const Text = styled.div`
    width: auto;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.002em;
    white-space: pre-wrap;
    
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

    &.txt-red-error {
        color: ${RedError} !important;
    }

    &.txt-gray-blue {
        color: ${BlueGray} !important;
    }

    &.txt-yellow-gray {
        color: ${YellowGray} !important;
    }

    &.txt-yellow-light {
        color: ${YellowLight} !important;
    }

    ${'' /* Font Size Text Custome */}
    &.font-params {
        font-size: ${props => props.fontSize}px !important; 

        @media screen and (max-width: 600px) {  
            font-size: 25px !important;
        }
    }

    &.flex-shrink-0 {
        flex-shrink: 0 !important;
    }

    ${'' /* Custome Front Family */}

    &.fml-baloo-tammudu-2 {
        font-family: 'Baloo Tammudu 2';
    }

    &.fml-endcode-sans-sc {
        font-family: 'Encode Sans SC', sans-serif;
    }

    &.min-width-params {
        min-width: ${props => props.minWidth}px !important; 
        white-space: pre-wrap;
    }

    & span {
        color: ${props => props.spanColor ? props.spanColor : RedError};
    }

    &.span-bold span { 
        font-weight: bold;
    }
`;
