import React from 'react';
import {
    LayoutTable, HeaderTable,
    TitleTable, ContentTable,
    ItemTable, Cell,
    EmptyDataTable, ImageDefault
} from 'src/style-common/Table.Style';

const TableHistoryTrans = () => {
    return (
        <LayoutTable className='mt-4'>
            <HeaderTable>
                <Cell width={200}>Mã số thẻ</Cell>
                <Cell width={400}>Giá trị thẻ</Cell>
                <Cell  width={300}>Ngày nạp thẻ</Cell>
                <Cell width={150}>Giờ nạp thẻ</Cell>
            </HeaderTable>
            <ContentTable>
                <ItemTable>
                    <Cell width={200}>Mã số thẻ</Cell>
                    <Cell width={400}>Giá trị thẻ</Cell>
                    <Cell  width={300}>Ngày nạp thẻ</Cell>
                    <Cell width={150}>Giờ nạp thẻ</Cell>
                </ItemTable>
            </ContentTable>
        </LayoutTable>
    );
};

export default TableHistoryTrans;
