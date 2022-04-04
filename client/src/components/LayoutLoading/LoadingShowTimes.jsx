import React from 'react';
import { HashLoader } from 'react-spinners';
import { YellowGray } from 'src/contants/cssContants';
import styled from 'styled-components';

const LayoutLoadingTable = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;

    width: 100%;
    height: 400px;
`;


const LoadingShowTimes = () => {
    return (
        <LayoutLoadingTable>
            <div className='text-center'>
                <HashLoader size={60} color={YellowGray}/>
            </div>
        </LayoutLoadingTable>
    );
};


export default LoadingShowTimes;
