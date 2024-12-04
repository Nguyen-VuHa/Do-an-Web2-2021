import styled from 'styled-components';
import { BlueGray } from 'src/contants/cssContants';

export const FooterLayout = styled.div`
    background-color: ${BlueGray};
    padding: 40px 15px 20px 15px;
`;

export const TitlteWidget = styled.h1`
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    line-height: 1;
    position: relative;
    text-transform: uppercase;
    margin: 0 0 25px 0;
    padding-left: 16px;

    &::before {
        background-color: #d4dd29;
        content: "";
        height: 22px;
        left: 0;
        position: absolute;
        top: -2px;
        width: 4px;
    }

`;

export const WidgetContainer = styled.li`
   
    ul {
        list-style: outside none none;
        padding-left: 0;

        li {
            font-size: 13px;
            line-height: 20px;
            position: relative;
            text-transform: uppercase;
            margin-bottom: 7px;
            padding-bottom: 7px;
            color: #d8d8d8;

            a {
                -webkit-transition-timing-function: ease;
                transition-timing-function: ease;
                -webkit-transition-duration: 200ms;
                transition-duration: 200ms;
                color: #a0a3a7;
                cursor: pointer;
                text-decoration: none;

                i {
                    opacity: 0;
                }

                &:hover{
                    padding: 10px;
                    color:  #d4dd29;

                    i {
                        opacity: 1;
                    }
                }
            }
        }
    }
`;

export const SocialMenu = styled.div`
    ul{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30;
        display: flex;
    }
    
    ul li {
        list-style: none;
        margin: 7px;
    }
    
    ul li .fab {
       
        font-size: 25px;
        line-height: 50px;
        transition: .5s;
    }
    
    ul li a:hover .fab {
        color: #ffffff;
    }
    
    ul li a {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-bottom-left-radius: 50%;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
        background-color: var(#77A7FF);
        transition: 0.5s;
        transform: translate(0,0px);
        box-shadow: 0px 7px 5px rgba(0, 0, 0, 0.5);
    }
    
    ul li a i {
        justify-content: center;
        align-items: center;
        font-size: 13px;
    }
    
    ul li a:hover {
        padding: 0px;
        transform: rotate(0deg) skew(0deg) translate(0, -10px);
    }
    ul li:nth-child(1) a {
        color: #3b5999;
    }
    
    ul li:nth-child(2) a {
        color: #cd201f;
    }
    
    ul li:nth-child(3) a {
        color: #e4405f;
    }
    
    ul li:nth-child(4) a {
        color: #55acee;
    }
    
    ul li:nth-child(1) a:hover {
        background-color: #3b5999;
    }
    ul li:nth-child(2) a:hover {
        background-color: #cd201f;
    }
    ul li:nth-child(3) a:hover {
        background-color: #e4405f;
    }
    ul li:nth-child(4) a:hover {
        background-color: #55acee;
    }
`;