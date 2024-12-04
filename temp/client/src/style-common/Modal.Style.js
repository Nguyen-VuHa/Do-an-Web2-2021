import { BlueGray, YellowGray } from 'src/contants/cssContants';
import styled from 'styled-components';

export const LayoutModal = styled.div`
    position: fixed;

    visible: hidden;
    opacity: 0;
    top: 0;
    left: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    z-index: -99999;

    overflow-x: auto;
    transition: all .4s ease;

    &.show {
        visible: visible;
        opacity: 1;
        z-index: 999999;
    }
`;

export const ModalBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
`;


export const ContentModal = styled.div`
    position: relative;
    width: 90%;
    height: auto;

    z-index: 10;
    background: ${props => props.bgColor ? props.bgColor : BlueGray};

    box-shadow: 1px 2px 15px #000;
    border-radius: 6px;

    &.lg {
        width: 65%;
    }

    &.mb {
        width: 50%;
    }

    @media screen and (max-width: 764px) {  
        margin-top: 490px;
        margin-bottom: 100px;
    }

    @media screen and (max-width: 600px) {  
        margin-top: 450px;
        margin-bottom: 100px;
    }
`;

export const ButtonClose = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: white;
   
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .4s ease;
    color: ${YellowGray};

    z-index: 10;

    i {
        font-size: 20px;
    }

    &:hover {
        color: red;
        background: rgba(59, 58, 58, 0.75);

    }
`;

export const ModalHeader = styled.div`  
    position: absolute;

    top: 0;
    left: 0;

    padding: 8px;

    width: 100%;
    height: 25px;
`;

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 70px;
    margin-bottom: 60px;
    padding: 1rem;

    width: 100%;
    min-height: 200px;
    height: auto;
`;

export const ModalFooter = styled.div`
    position: absolute;

    display: flex;
    justify-content: end;
    align-items: center;
    
    bottom: 0;
    padding: 8px;

    width: 100%;
    height: 60px;
`;