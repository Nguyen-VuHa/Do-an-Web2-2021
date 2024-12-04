import { BlueGray, FontRoboto, Green, YellowGray } from 'src/contants/cssContants';
import styled from 'styled-components';

export const Header = styled.header`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    
    background: ${BlueGray};
    box-shadow: 0 3px 10px rgba(0,  0,  0, 0.3);
    top: 0px;
    
    width: 100%;
    height: 10vh;
    z-index: 1000;
`;

export const LayoutButton = styled.div`
    display: flex;
    align-items: center;

    width: 100%;

    i {
        color: ${Green};
        font-size: 1.3rem;
    }
`;

export const ButtonHeader = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    border-radius: 10px;

    font-family: ${FontRoboto};
    font-size: 1rem;
    font-weight: 600;
    color: ${Green};

    width: calc(100%/ 3);
    
    user-select: none;
    cursor: pointer;
    margin: 0 5px;

    i {
        margin-top: 8px;
    }

    &.active {
        color: ${YellowGray};
        text-shadow: #FC0 2px 0 15px;

        i {
            color: ${YellowGray};
        }
    }
`;