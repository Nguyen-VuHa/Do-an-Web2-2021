import { BlueGray, GrayWhite } from 'src/contants/cssContants';
import styled from 'styled-components';

export const SkeletonBox = styled.div`
    display: inline-block;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    position: relative;
    overflow: hidden;
    background-color: ${BlueGray};
    border-radius: 18px;

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(166, 178, 201, 0) 0,
            rgba(166, 178, 201, 0.2) 40%,
            rgba(166, 178, 201, 0.5) 70%,
            rgba(166, 178, 201, 0)
        );
        animation: shimmer 2s infinite;
        content: '';
    }
`;