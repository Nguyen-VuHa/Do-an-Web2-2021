import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingShowTimes from 'src/components/LayoutLoading/LoadingShowTimes';
import { Divider } from 'src/style-common/Layout.Style';
import { Text } from 'src/style-common/Text.Style';
import ListShowTimes from './ListShowTimes';
import { EmptyDataTable, ImageDefault } from 'src/style-common/Table.Style';
import Images from 'src/contants/image';

const ShowTimeDetail = () => {
    const { loading, showtimesByMovie, movieNameShowTimes } = useSelector(state => state.showtimeState);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(loading === false) {
            let timeOut = setTimeout(() => {
                setIsLoading(false);
            }, 1500);

            return () => clearTimeout(timeOut);
        }
        else {
            setIsLoading(true);
        }
    }, [loading]);
    
    return (
        <div className='container position-relative'>
            {
                isLoading ? <LoadingShowTimes />
                : <>
                    {
                        movieNameShowTimes && loading === false ?
                        <>
                            <div className='d-flex pb-3'>
                                <Text className='txt-green fw-600 font-params' fontSize={28}>Suất chiếu phim: </Text>
                                <Text className='txt-yellow-gray fw-bold font-params fml-endcode-sans-sc ml-4' fontSize={28}>
                                    { movieNameShowTimes }
                                </Text>
                            </div>
                            <Divider />
                            {
                                showtimesByMovie && showtimesByMovie.length > 0 
                                ? showtimesByMovie.map((st, idx) => {
                                    return <ListShowTimes 
                                        key={idx}
                                        data={st}
                                    />
                                }) : <div className="d-flex justify-content-center align-items-center w-100">
                                    <EmptyDataTable>
                                        <ImageDefault url={Images.MOVIE_DEFAULT} />
                                        <Text className="mt-4 fw-600 font-params fml-baloo-tammudu-2" fontSize={20}>Không có xuất chiếu nào hiện tại!</Text>
                                    </EmptyDataTable>
                                </div>
                            }
                        </>
                        : ''
                    }
                </>
            }
        </div>
    );
};


export default ShowTimeDetail;
