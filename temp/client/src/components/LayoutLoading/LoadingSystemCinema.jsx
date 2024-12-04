import React from 'react';
import { BlueGray } from 'src/contants/cssContants';
import { SkeletonBox } from 'src/style-common/Skeleton.Style';
import styled from 'styled-components';

const SystemCiemaLayout = styled.div`
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

const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
`;

const LoadingSystemCinema = () => {
    return (
        <SystemCiemaLayout>
            <LayoutContent className='container flex-column'>
                <div className="w-100 text-center">
                    <SkeletonBox width={400} height={50} className='mt-5'/>
                </div>
                <GridLayout>
                    <SkeletonBox width={250} height={350} className='mt-5'/>
                    <SkeletonBox width={250} height={350} className='mt-5'/>
                    <SkeletonBox width={250} height={350} className='mt-5'/>
                    <SkeletonBox width={250} height={350} className='mt-5'/>
                </GridLayout>
            </LayoutContent>
        </SystemCiemaLayout>
    );
};

export default LoadingSystemCinema;
