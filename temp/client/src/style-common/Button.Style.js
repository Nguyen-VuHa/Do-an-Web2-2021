import {
    FontEncodeSans, Green, RedError, White, YellowGray
} from 'src/contants/cssContants';
import styled from 'styled-components';

export const ButtonHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 10px 30px;
    width: 140px;
    height: 70px;

    color: ${White};

    font-size: 16px;
    font-weight: 600;
    font-family: ${FontEncodeSans};
    border-radius: 6px;

    transition: 0.5s;

    &.active {
        color: ${Green};
    }

    &.active::after {
        content: '';
        position: absolute;
        bottom: 0;

        width: 100%;
        height: 2px;
        background: ${Green};
        border-radius: 6px; 
    }

    &:hover {
        color: ${Green};
        background: #262c37;
    }

    &:hover::before {
        content: ${props => props.content ? `'${props.content}'` : 'Không có'};
        position: absolute;

        font-size: 14px;
        letter-spacing: 1px;
        text-align: center;
        width: 100%;
        top: 110%;
        left: 0;

        background: #262c37;
        color: ${Green};
        padding: 8px 10px;
        border-radius: 6px;
    }
    
    i {
        font-size: 30px;
    }

    @media screen and (max-width: 1024px) {  
        font-size: 12px;
        width: 100px;

        i {
            font-size: 25px;
        }
    }
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background: ${props => props.bgcolor ? props.bgcolor : Green};
    color: ${props => props.color ? props.color : White};

    width: ${props => props.width ? `${props.width}px` : 'auto'};
    padding: 8px 24px;
    border-radius: 6px;
    border: none;

    cursor: pointer;
    user-select: none;
    border: 1px solid ${Green};
    
    &.btn-back {
        background: transparent;
        border: 1px solid ${Green};
        color: ${Green};

        &:hover {
            box-shadow: none !important;
            background: rgba(0,0,0,0.3);
        }
    }

    &.btn-error {
        background: transparent;
        border: 1px solid ${RedError};
        color: ${White};

        &:hover {
            box-shadow: none !important;
            background: rgba(0,0,0,0.3);
        }
    }

    &.submit {
        opacity: 0.5;
        pointer-events: none;
    }

    &:hover, &.active {
        opacity: 0.8;
        box-shadow: 0 0 5px #27df2d, 0 0 30px #27df2d, 0 0 80px #27df2d, 0 0 250px #27df2d;
        filter: brightness(1.2);
    }
    
    &:focus {
        outline: none;
    }
`;


export const ButtonIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    border: 1px solid ${Green};
    
    cursor: pointer;
    user-select: none;
    transition: all .35s ease;

    &:hover {
        background: ${Green};
        color: ${White};
        
        i, div {
            color: ${White};
        }

    }

    i, div{
        transition: all .35s ease;
        font-size: 20px;
        color: ${Green};
    }
`;

export const ButtonTabbar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${YellowGray};
    color: ${YellowGray};

    cursor: pointer;
    user-select: none;

    padding: 8px 16px;

    transition: all .35s ease;

    &:hover, &.active {
        background: ${YellowGray};
        color: ${White};
    }
`;