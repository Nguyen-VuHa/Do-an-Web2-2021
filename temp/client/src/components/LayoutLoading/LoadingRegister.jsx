import React from 'react';
import { BlueGray } from 'src/contants/cssContants';
import { SkeletonBox } from 'src/style-common/Skeleton.Style';
import styled from 'styled-components';

const RegisterLayout = styled.div`
    position: fixed;
    z-index: 500;
    top: 0;

    width: 100vw;
    height: 100vh;
    background: ${BlueGray};
    padding-top: 80px;
`;

const LayoutContent = styled.div`
    display: flex;
    width: 100%;

    @media screen and (max-width: 764px) {  
        display: none
    }
`;

const FlexBox = styled.div`
    display: flex;
`;

const LoadingRegister = () => {


    return (
        <RegisterLayout>
            <LayoutContent>
                <div className='w-100 text-center'>
                    <SkeletonBox width={350} height={50} className='mt-5'/>
                    <FlexBox className='w-100 container'>
                        <div className='w-50'>
                            <SkeletonBox width={350} height={25} className='mt-5'/>
                            <SkeletonBox width={350} height={25} className='mt-5'/>
                            <SkeletonBox width={350} height={25} className='mt-5'/>
                            <SkeletonBox width={350} height={25} className='mt-5'/>
                            <SkeletonBox width={350} height={25} className='mt-5'/>
                        </div>
                        <div className='w-50'>
                            <SkeletonBox width={350} height={400} className='mt-5'/>
                        </div>
                    </FlexBox>
                </div>
            </LayoutContent>
        </RegisterLayout>
    );
};


export default LoadingRegister;
