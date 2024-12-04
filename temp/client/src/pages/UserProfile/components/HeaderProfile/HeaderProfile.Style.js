import styled from 'styled-components';
import { BlueGray, FontEncodeSans, FontNotoSansMono, GrayWhite, Green, YellowGray } from 'src/contants/cssContants';

export const LayoutHeaderProfile = styled.div`
    position: relative;

    width: 100%;
    height: 400px;

    background: rgba(255,255,255,0.1);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    
    cursor: pointer;

    @media screen and (max-width: 600px) {  
        height: 250px;
    }
`;

export const ButtonChangeBackground = styled.div`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
    
    bottom: 10px;
    right: 10px;

    width: auto;
    padding: 0px 12px;
    border-radius: 8px;
    height: 36px;

    background: ${GrayWhite};
    font-size: 13px;
    transition: all .3s ease;
    z-index: 2;

    &:hover {
        background: ${BlueGray};
        color: #FFF;
    }
    
`;

export const LayoutAvatarProfile = styled.div`
    position: absolute;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: auto;

    bottom: -24%;
    z-index: 1;

    @media screen and (max-width: 600px) {  
       bottom: -45%;
    }
`;


export const FramePhoto = styled.div`
    position: relative;
    overflow: hidden;

    width: 170px;
    height: 170px;

    border-radius: 50%;  
    border: 4px solid ${BlueGray};
`;

export const ImageView = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;

    &:hover {
        opacity: 0.8;
    }
`;

export const ButtonDialog = styled.div`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    bottom: 5px;
    right: 20px;

    background: #263147;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.2rem;

    z-index: 10;

    i {
        color: #FFF;
    }

    &:hover {
        background: #2a3853;
        font-weight: bold;
    }
`;