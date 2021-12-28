import styled from 'styled-components';

export const LayoutModal = styled.div`
    position: fixed;
    display: none;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;
    z-index: 999999;

    &.show {
        display: flex;
    }
`;

export const ModalBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
`;

export const LayoutTrailer = styled.div`
    width: 75%;
    height: 600px;
    top: 0;
    z-index: 10;
    position: relative;
    transition: all .4 ease;

    @media screen and (max-width: 764px) {  
        width: 90%;
    }
`;

export const VideTrailer = styled.div`
    width: auto;
    height: auto;
`;

export const ButtonClose = styled.div`
    position: absolute;
    top: -15px;
    right: -15px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: white;
    background: rgba(59, 58, 58, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .4s ease;

    i {
        font-size: 20px;
    }

    &:hover {
        color: red;
        background: rgb(94, 92, 92);
    }
`;

export const Iframe = styled.iframe`
    width: 100%;
    height: 600px;

    @media screen and (max-width: 1024px) {  
        height: 400px;
    }

    @media screen and (max-width: 764px) {  
        height: 300px;
    }

    @media screen and (max-width: 500px) {  
        height: 250px;
    }
`;