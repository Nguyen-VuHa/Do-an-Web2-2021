import styled from 'styled-components';
import { GrayWhite, Green } from 'src/contants/cssContants';

export const ButtonTabbar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 42px;
    padding: 8px 12px;

    user-select: none;
    cursor: pointer;

    color: ${GrayWhite};
    border-radius: 6px;
    transition: all .35s ease;
    border-bottom: 2px solid transparent;

    &:hover {
        background: rgba(255,255,255,0.1);
    }

    &.active {
        color: ${Green};
        border-bottom: 2px solid ${Green};
        border-radius: 0%;
        
        &:hover {
            background: transparent;
        }
    }
`;