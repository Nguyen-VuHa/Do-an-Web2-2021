import { BlueGray, GrayWhite, Green } from 'src/contants/cssContants';
import styled from 'styled-components';

export const ButtonNotify = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 45px;
    height: 45px;

    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;

    cursor: pointer;
    border: 1px solid ${Green};

    i {
        color: ${Green};
        font-size: 1.3em;
    }

    &:hover {
        z-index: 10;
        border: 1px solid #2aff30;
    }
`;

export const NotifyCount = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    
    top: -1px;
    right: -1px;
    width: 20px;
    height: 20px;

    border-radius: 50%;
    color: #fff;
    background: #c65858;

    span {
        font-size: 11px;
    }
`;

export const LayoutDropNotify = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;

    top: 50%;
    right: 0%;
    width: 450px;
    min-height: 600px;
    max-height: 600px;

    background: ${BlueGray};
    border: 1px solid ${Green};

    visibility: hidden;
    transition: 0.5s;
    opacity: 0;
    overflow: hidden;

    &.active {
        top: 120%;
        visibility: visible;
        opacity: 1;
    }
`;

export const NotifyTitle = styled.div`
    display: flex;
    justify-content: center;
    color: ${Green};
    font-size: 17px;
    font-weight: 600;
`;

export const NotifyContent = styled.ul`
    margin: 0;
    padding: 0;
`;

export const NotifyContentItem = styled.li`
    display: flex;
    width: 100%;
    padding: 10px 5px;
    
    cursor: pointer;
    background-color: rgba(84,171,53,0.1);

    &.view {
        background: #121825;
    }

    &.seen {
        background: #142512;
    }

    &:hover {
        background-color: #c1dcb71a;
    }
`;

export const ImageNotify = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    img {
        width: 60px;
        object-fit: contain;
    }
`;

export const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    color: ${GrayWhite};

    p {
        margin: 0;
        font-size: 15px;
        line-height: 1.5rem;
    }

    span {
        color: ${Green};
        margin: 0;
        font-weight: 600;
    }
`;

export const NotifyTime = styled.div`
    font-size: 15px;
    font-weight: 600;
    margin-top: 6px;
    color: ${Green};
`;