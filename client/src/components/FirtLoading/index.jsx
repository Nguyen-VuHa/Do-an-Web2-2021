import React from 'react';
import styled from 'styled-components';
import { BlueGray, Green, FontEncodeSans } from 'src/contants/cssContants';
import { FadeLoader } from 'react-spinners';

const Layout = styled.div`
    position: fixed;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100vw;
    height: 100vh;

    background: ${BlueGray};
    z-index: 999999;

    @media screen and (max-width: 764px) {  
        .css-36nhqm {
            left: 30px;
        }
    }
`;

const TextLoading = styled.div`
    color: ${Green};
    margin-top: 54px;

    font-size: 30px;
    font-weight: 500; 
    font-family: ${FontEncodeSans};

    @media screen and (max-width: 764px) {  
        font-size: 25px;
    }
`;

const FirstLoading = () => {
    return (
        <Layout>
            <FadeLoader height={50} width={8} color={Green} radius={6} margin={40}/>
            <TextLoading>Đang tải trang . . . </TextLoading>
        </Layout>
    );
};

export default FirstLoading;
