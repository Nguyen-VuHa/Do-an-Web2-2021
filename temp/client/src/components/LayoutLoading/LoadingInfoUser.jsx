import React from 'react';
import styled from 'styled-components';
import { SkeletonBox } from 'src/style-common/Skeleton.Style';
import { BlueGray } from 'src/contants/cssContants';
import { FormGroup } from 'src/style-common/Layout.Style';

const LayoutLoading = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    z-index: 500;

    padding: 16px;

    background: ${BlueGray};
`;

export const LayoutContentInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
`;

const LoadingInfoUser = () => {
    return (
        <LayoutLoading className="container">
            <div className="d-flex justify-content-between align-items-center w-100">
                <SkeletonBox width={300} height={30} className='mt-3'/>
                <SkeletonBox width={150} height={30} className='mt-3'/>
            </div>
            <LayoutContentInfo className='mt-4'>
                <FormGroup className="flex-column">
                    <SkeletonBox width={150} height={20} className='mt-3'/>
                    <SkeletonBox width={300} height={20} className='mt-3'/>
                </FormGroup>
                <FormGroup className="flex-column">
                    <SkeletonBox width={150} height={20} className='mt-3'/>
                    <SkeletonBox width={300} height={20} className='mt-3'/>
                </FormGroup>
                <FormGroup className="flex-column">
                    <SkeletonBox width={150} height={20} className='mt-3'/>
                    <SkeletonBox width={300} height={20} className='mt-3'/>
                </FormGroup>
                <FormGroup className="flex-column">
                    <SkeletonBox width={150} height={20} className='mt-3'/>
                    <SkeletonBox width={300} height={20} className='mt-3'/>
                </FormGroup>
                <FormGroup className="flex-column">
                    <SkeletonBox width={150} height={20} className='mt-3'/>
                    <SkeletonBox width={300} height={20} className='mt-3'/>
                </FormGroup>
            </LayoutContentInfo>
        </LayoutLoading>
    );
};

export default LoadingInfoUser;
