import { FontEncodeSans, Green, White } from 'src/contants/cssContants';
import styled from 'styled-components';

export const Layout = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;

    padding: 30px 50px;
`;

export const TitleMovie = styled.h3`
    font-size: 30px;
    font-weight: 600;
    color: ${Green};
    filter: brightness(1.2);
    font-family: ${FontEncodeSans};
`;

export const LayoutCarousel = styled.section`
    position: relative;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    height: 400px;
    overflow: hidden;
`;

export const ButonCarousel = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(17,22,31, 0.54);
    color: ${Green};
    z-index: 100;
    top: 35%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: all .4s ease;
    border-radius: 50%;
    border: 1px solid ${Green};

    &.left {
        left: 0%;
    }

    &.right {
        right: 0%;
    }

    &:hover {
        background: ${Green};
        color: ${White};
    }
`;

export const LayoutSlideCarousel = styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

export const SlickList = styled.div`
    margin: 0;
    padding: 0;

    position: relative;
    display: block;
    box-sizing: border-box;
`;

export const SlickTrack = styled.div`
    width: ${props => props.width}px;
    opacity: 1;
    position: absolute;
    left: 0;
    top: 0;
    transition: 700ms;
`;

export const SlickSlide = styled.div`
    outline: none;
    width: ${props => props.width}px;
    display: block;
    float: left;
    height: 100%;
    min-height: 1px;
`;