import { BlueGray, GrayWhite, Green } from "src/contants/cssContants";
import styled from "styled-components";

export const ButtonUser = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 45px;
    height: 45px;

    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;

    cursor: pointer;

    ${props => props.url ? `
        background-image: url('${props.url}');
        background-size: cover;
    ` : '' }

    &:hover {
        opacity: 0.8;
    }
`;

export const LayoutDropMenu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;

    top: 50%;
    right: 0%;
    width: 250px;
    height: auto;

    background: ${BlueGray};
    border: 1px solid ${Green};

    visibility: hidden;
    transition: 0.5s;
    opacity: 0;
    overflow: hidden;

    &.active {
        top: 120%;
        visibility: visible;
        opacity: 1;
    }
`;

export const ButtonMenu = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;

    width: 100%;
    padding: 8px 12px;

    i {
        max-width: 20px;
        margin-right: 10px;
        opacity: 0.5;
        transition: 0.5s;
        color: ${GrayWhite};
    }

    a {
        color: ${GrayWhite};
    }

    &:hover {
        i {
            opacity: 1;
        }

        a {
            color: ${Green};
        }
    }

`;