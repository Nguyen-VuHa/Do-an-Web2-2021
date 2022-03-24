import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingInfoUser from 'src/components/LayoutLoading/LoadingInfoUser';
import { getWalletPersonalUser } from 'src/reducers/profileSlice';
import HeaderHistoryTrans from '../components/HistoryTransaction/HeaderHistoryTrans';
import TableHistoryTrans from '../components/HistoryTransaction/TableHistoryTrans';

const HistoryTransactionPage = () => {
    // getWalletPersonalUser
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.profileState);

    useEffect(() => {
        dispatch(getWalletPersonalUser());
    }, []);

    return (
        <div className='position-relative w-100'>
            { loading ? <LoadingInfoUser /> : '' }

            <HeaderHistoryTrans />
            <TableHistoryTrans />
        </div>
    );
};

export default HistoryTransactionPage;
