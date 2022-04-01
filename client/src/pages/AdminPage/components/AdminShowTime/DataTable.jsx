import React from 'react';
import { Text } from 'src/style-common/Text.Style';

import {
    LayoutTable, HeaderTable,
    TitleTable, ContentTable,
    ItemTable, Cell,
    EmptyDataTable, ImageDefault
} from 'src/style-common/Table.Style';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Images from 'src/contants/image';
import LoadingTable from 'src/components/LoadingTable';

const DataTable = () => {
    const { loading, showtimes } = useSelector(state => state.showtimeState); 

    return (
        <>
            <div className="text-center w-100 mt-4">
                <Text className="txt-green fw-600 font-params" fontSize={30}>DANH SÁCH SUẤT CHIẾU</Text>
            </div>
            <LayoutTable className='mt-4'>
                <HeaderTable>
                    <Cell width={350}>Tên phim</Cell>
                    <Cell width={300}>Rạp chiếu</Cell>
                    <Cell width={200}>Suất chiếu</Cell>
                    <Cell width={200}>Ngày chiếu</Cell>
                    <Cell width={250}>Giá vé</Cell>
                </HeaderTable>
                <ContentTable>
                    {
                        showtimes && showtimes.length > 0 && loading === false
                        ? showtimes.map((s, idx) => {
                            return <ItemTable key={idx}>
                                <Cell width={350}>{ s.R_Movie.movieName }</Cell>
                                <Cell width={300}>{ s.Cinema.nameCinema }</Cell>
                                <Cell width={200}>{ s.showTime }</Cell>
                                <Cell width={200}>{ moment(s.premiereDate).format('DD/MM/YYYY') }</Cell>
                                <Cell width={250}>{ parseInt(s.fare).toLocaleString() } đ</Cell>
                            </ItemTable>
                        }) 
                        : loading ? <LoadingTable /> : <div className="d-flex justify-content-center align-items-center w-100">
                            <EmptyDataTable>
                                <ImageDefault url={Images.NOTITEM} />
                                <Text className="mt-4 fw-600 font-params fml-baloo-tammudu-2" fontSize={20}>Hiện tại không có suất chiếu nào!</Text>
                            </EmptyDataTable>
                        </div>
                    }
                </ContentTable>
            </LayoutTable>
        </>
    );
};

export default DataTable;
