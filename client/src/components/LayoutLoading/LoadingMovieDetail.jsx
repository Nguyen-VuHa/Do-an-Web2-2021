import React from 'react';
import { SkeletonBox } from 'src/style-common/Skeleton.Style';
import { BlueGray } from 'src/contants/cssContants';
import styled from 'styled-components';

const MovieDetailLayout = styled.div`
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


const LoadingMovieDetail = () => {
    return (
        <MovieDetailLayout>
            <LayoutContent className='container flex-column'>
                <div className="d-flex">
                    <SkeletonBox width={150} height={40} className='mt-5'/>
                    <SkeletonBox width={350} height={40} className='mt-5 ml-3'/>
                </div>
                <LayoutContent>
                    <SkeletonBox width={300} height={400} className='mt-5 mr-5'/>
                    <div>
                        <SkeletonBox width={350} height={40} className='mt-5'/>
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
        </MovieDetailLayout>
    );
};

export default LoadingMovieDetail;
