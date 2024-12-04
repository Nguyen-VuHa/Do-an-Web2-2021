import React from 'react';
import { useSelector } from 'react-redux';
import Images from 'src/contants/image';
import {
    LayoutTable, HeaderTable,
    TitleTable, ContentTable,
    ItemTable, Cell,
    EmptyDataTable, ImageDefault
} from 'src/style-common/Table.Style';
import { Text } from 'src/style-common/Text.Style';
import moment from 'moment';

const TableHistoryTrans = () => {
    const { walletList } = useSelector(state => state.profileState);
    
    return (
        <LayoutTable className='mt-4'>
            <HeaderTable>
                <Cell width={200}>Mã số thẻ</Cell>
                <Cell width={400}>Giá trị thẻ</Cell>
                <Cell  width={300}>Ngày nạp thẻ</Cell>
                <Cell width={150}>Giờ nạp thẻ</Cell>
            </HeaderTable>
            <ContentTable>
            {
                walletList && walletList.length > 0
                ? walletList.map((w, idx) => {
                    return   <ItemTable key={idx} index={idx + 1}>
                        <Cell width={200}>{ w.code }</Cell>
                        <Cell width={400}>{ w.denominations.toLocaleString() }</Cell>
                        <Cell  width={300}>{ moment(w.createdAt).format('DD/MM/YYYY')}</Cell>
                        <Cell width={150}>{ w.tradingHours }</Cell>
                    </ItemTable>
                }) 
                :  <div className="d-flex justify-content-center align-items-center w-100">
                    <EmptyDataTable>
                        <ImageDefault url={Images.NOTITEM} />
                        <Text className="mt-4 fw-600 font-params fml-baloo-tammudu-2" fontSize={20}>Hiện tại không có giao dịch nào!</Text>
                    </EmptyDataTable>
                </div>
            }
              
            </ContentTable>
        </LayoutTable>
    );
};

export default TableHistoryTrans;
