import styled from 'styled-components';
import { BlueGray, FontRoboto, Green, GrayWhite } from 'src/contants/cssContants';

export const FormLayout = styled.form`
    position: absolute;
    top: 110%;
    right: 0;
    
    width: 350px;
    padding: 30px;

    border-radius: 6px;
    background: ${BlueGray};
    box-shadow: 2px solid rgba(0, 0, 0, 0.5);
    border: 1px solid ${Green};
    
    z-index: 100;

    opacity: 0;
    transform: translateX(150%);
    visibility: hidden;
    transition: all 0.4s;
    transition-delay: transform 0.3s ease-in;

    &.show {
        transform: translateX(0%);
        opacity: 1;
        visibility: visible;
    }
`;

export const FormGroup = styled.div`
    font-family: ${FontRoboto};
    font-weight: 300;
`;

export const FormControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TextLink = styled.div`
    color: ${GrayWhite};
    cursor: pointer;
    font-weight: 400;

    &:hover {
        color: ${Green};
    }
`;