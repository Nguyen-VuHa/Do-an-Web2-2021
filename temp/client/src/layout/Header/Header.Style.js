import styled from 'styled-components';
import { BlueGray, FontRoboto, Green } from 'src/contants/cssContants';

export const Header = styled.header`
    position: fixed;
    
    background: ${BlueGray};
    box-shadow: 0 3px 10px rgba(0,  0,  0, 0.3);
    top: 0px;
    
    width: 100%;
    z-index: 996;
    transform: translateY(0%);
    transition: all 0.5s ease;

    &.hide {
        transform: translateY(-110%);
        width: 100%;
    }
`;

export const NavHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 12vh;
    margin: auto;
    width: 90%;
    font-family: ${FontRoboto};
`;

export const HeaderLogo = styled.img`
    padding: 15px;
    width: 250px;
    height: 100%;
    object-fit: cover;

    @media screen and (max-width: 1024px) {  
        width: 170px;
    }
`;

export const ContentMenu = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0;
    font-size: 1rem;
   
    background: ${BlueGray};
`;

export const ItemMenu = styled.li`
    border-radius: 10px;
    font-family: ${FontRoboto};

    margin: 0 5px;
`;