import { FontBalooTammudu2, GrayWhite, YellowGray, Green } from 'src/contants/cssContants';
import styled from 'styled-components';

export const LayoutComment = styled.div`
    width: 70%;
    padding-bottom: 40px;

    @media screen and (max-width: 600px) {  
        width: 100%;
    }
`;

// Raiting star 
export const LayoutRaitingStar = styled.div`
    display: flex;
    width: 100%;

    @media screen and (max-width: 600px) {  
        flex-direction: column;
        align-items: flex-start;
    }
`;
export const TitleRaiting = styled.div`
    font-family: ${FontBalooTammudu2};
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: ${YellowGray};
    margin-right: 2rem;

    @media screen and (max-width: 768px) {  
        font-size: 2.4rem;
    }

    @media screen and (max-width: 600px) {  
        font-size: 1.5rem;
        margin-right: 0;
    }
`;

export const Star = styled.div`
    width: auto;
    display: inline-block;

    input.star { display: none; }
        
    label.star {
        float: right;
        padding: 10px;
        font-size: 36px;
        color: #444;
        transition: all .2s;
    }
    
    input.star:checked ~ label.star:before {
        content: '\f005';
        font-family: "Font Awesome 5 Pro";
        color: #FD4;
        transition: all .25s;
    }
    
    input.star-5:checked ~ label.star:before {
        color: #FE7;
        text-shadow: 0 0 20px #952;
    }
    
    input.star-1:checked ~ label.star:before { color: #F62; }
    
    label.star:hover { transform: rotate(-15deg) scale(1.3); }
    
    label.star:before {
        content: '\f005';
        font-family: "Font Awesome 5 Pro";
        color: $colorText;
    }

    @media screen and (max-width: 600px) {  
        label.star {
            float: right;
            padding: 10px;
            font-size: 30px;
            color: #444;
            transition: all .2s;
        }
    }
`;

// Input comment 
export const LayoutInputComment = styled.div`
    position: relative;
    margin: 0 0 8px 32px;
    margin-top: 15px;
    padding-bottom: 48px;
    line-height: 1.6;
    max-width: 750px;
    min-width: 600px;

    @media screen and (max-width: 600px) {  
        max-width: 280px;
        min-width: 0;
    }
`;

export const AvatarComment = styled.img`
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: absolute;
    left: -32px;
    top: -4px;
    text-align: center;
`;

export const CommentText = styled.div`
    margin: 16px 0 0 16px;
    border-bottom: 1px solid ${GrayWhite};
    padding-bottom: 4px;
    padding-left: 0;
    color: ${GrayWhite};
    white-space: pre-wrap;
    font-size: 1rem;

    &:focus{
        outline: none;
    }

    &::before {
        content: attr(placeholder);
        color: ${GrayWhite};
        cursor: text;
    }
`;

export const CommentAction = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
`;

export const UserTag = styled.div`
    position: absolute;
    left: 18px;
    font-size: 16px;
    font-weight: 600;

    color: ${YellowGray};
`;

export const MainComment = styled.div`
    position: relative;
    padding: 4px 0 0 16px;
    display: flex;

    @media screen and (max-width: 600px) {  
        padding: 0;
    }
`;

export const ImageUser = styled.div`
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    margin-top: 2px;
    margin-right: 6px;
    height: 32px;
    width: 32px;
    overflow: hidden;
    flex-shrink: 0;
`;

export const CommentBox = styled.div`
    padding-right: 16px;
    flex-grow: 1;
`;

export const ContentBox = styled.div`
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    border-bottom-left-radius: 18px;
    box-sizing: border-box;
    color: $colorText;
    width: fit-content;
    background: #283145;
`;

export const CommentContent = styled.div`
    padding: 8px 12px;
    min-width: 300px;

    span {
        color: ${YellowGray};
        font-weight: 600;
    }

    @media screen and (max-width: 600px) {  
        min-width: 0;
    }
`;


export const CommentContentText = styled.div`
    word-wrap: break-word;
    color: ${GrayWhite};

    span {
        cursor: pointer;
        margin-right: 5px;
        color: ${YellowGray};
        font-weight: 600;
        
        &:hover {
            border-bottom: 1px solid;
        }
    }
`;

// Action Comment
export const ActionCommentLayout = styled.div`
    display: flex;
    color: ${GrayWhite};
    font-size: 0.8rem;
    padding: 0px 12px;

    span {
        margin: 0 5px;
        font-size: 20px;
    }
`;

export const ButtonAction = styled.div`
    cursor: pointer;
    user-select: none;
    font-weight: 400;
    font-size: 14px;
    margin-top: 5px;

    &:hover {
        color: ${YellowGray};
    }

    &.active {
        color: ${Green};
    }

    &.no-hover {
        color: inherit;
    }
`;

export const DependentComment = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    padding-left: 54px;

    @media screen and (max-width: 600px) {  
        padding: 0;
    }
`;