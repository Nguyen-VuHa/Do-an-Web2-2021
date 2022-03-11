import React from 'react';
import HeaderHistoryTrans from '../components/HistoryTransaction/HeaderHistoryTrans';
import TableHistoryTrans from '../components/HistoryTransaction/TableHistoryTrans';

const HistoryTransactionPage = () => {
    return (
        <div className='position-relative w-100'>
            <HeaderHistoryTrans />
            <TableHistoryTrans />
        </div>
    );
};

export default HistoryTransactionPage;
