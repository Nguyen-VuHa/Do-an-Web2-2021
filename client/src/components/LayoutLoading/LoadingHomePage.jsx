import React from 'react';
import { SkeletonBox } from 'src/style-common/Skeleton.Style';
import { BlueGray } from 'src/contants/cssContants';
import styled from 'styled-components';

const HomePageLayout = styled.div`
    position: fixed;
    z-index: 999;
    
    width: 100%;
    height: 100vh;
    background: ${BlueGray};
   
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


const LoadingHomePage = () => {
    return (
        <HomePageLayout>
            <LayoutContent className='container flex-column'>
                <SkeletonBox width={350} height={50} className='mt-5'/>
                <LayoutContent>
                    <SkeletonBox width={300} height={400} className='mt-5 mr-5'/>
                    <div>
                        <SkeletonBox width={350} height={50} className='mt-5'/>
                        <FlexBox>
                            <SkeletonBox width={150} height={25} className='mt-5'/>
                            <SkeletonBox width={350} height={25} className='mt-5 ml-3'/>
                        </FlexBox>
                        <FlexBox>
                            <SkeletonBox width={150} height={25} className='mt-5'/>
                            <SkeletonBox width={400} height={25} className='mt-5 ml-3'/>
                        </FlexBox>
                        <FlexBox>
                            <SkeletonBox width={150} height={25} className='mt-5'/>
                            <SkeletonBox width={200} height={25} className='mt-5 ml-3'/>
                        </FlexBox>
                    </div>
                </LayoutContent>
            </LayoutContent>
        </HomePageLayout>
    );
};

export default LoadingHomePage;
