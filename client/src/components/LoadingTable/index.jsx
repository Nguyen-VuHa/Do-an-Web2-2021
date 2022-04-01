import React from 'react';
import { HashLoader } from 'react-spinners';
import { YellowGray } from 'src/contants/cssContants';
import { Text } from 'src/style-common/Text.Style';
import styled from 'styled-components';


const LayoutLoadingTable = styled.div`
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: start;

    width: 100%;
    height: 400px;
`;
const LoadingTable = () => {
    return (
        <LayoutLoadingTable>
            <div className='text-center'>
                <HashLoader size={60} color={YellowGray}/>
                <Text className='mt-5 txt-yellow-gray font-params fw-500' fontSize={18}>
                    Loading for...
                </Text>
            </div>
        </LayoutLoadingTable>
    );
};

export default LoadingTable;
