import styled from 'styled-components';

export const WarrapImage = styled.div`
    padding: 20px 15px;
    display: grid;
    grid-template-columns: 100px 100px 100px 100px 100px 100px;
    grid-template-rows: auto;
    grid-gap: 10px;
    border-radius: 18px;
    
    
    .item-img {
        position: relative;
        cursor: pointer;
        
        &:hover::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255 ,0.2);
        }
    }

    
    @media screen and (max-width: 1024px) {  
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

export const ImageUserView = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const CircleImage = styled.div`
    width: 300px;
    height: 300px;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
`;

export const BackgroundImage = styled.div`
    position: absolute;
    opacity: 0.3;
    width: 300px;
    height: 300px;
`;

export const EditorCroppie = styled.div`
    position: relative;
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .cropper-image {
        width: 100%;
        height: 60vh;
    }
`;