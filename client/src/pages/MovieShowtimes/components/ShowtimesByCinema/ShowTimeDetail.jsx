import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingShowTimes from 'src/components/LayoutLoading/LoadingShowTimes';
import Images from 'src/contants/image';
import { Divider } from 'src/style-common/Layout.Style';
import { EmptyDataTable, ImageDefault } from 'src/style-common/Table.Style';
import { Text } from 'src/style-common/Text.Style';
import { CinemaFilterContext } from '../../contexts/CinemaFilterContext';
import ShowTimeItem from './ShowtimeItem';

const ShowTimeDetail = () => {
    const { loading, showtimesByCinema } = useSelector(state => state.showtimeState);

    const [isLoading, setIsLoading] = useState(false);
    const { stateFilter } = useContext(CinemaFilterContext);
    const { nameCinemaSelect } = stateFilter;

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
        <div className='container position-relative mt-5'>
            {
                isLoading ? <LoadingShowTimes />
                : <>
                    {
                        nameCinemaSelect && loading === false ?
                        <>
                            <div className='d-flex pb-3'>
                                <Text className='txt-green fw-600 font-params' fontSize={28}>Rạp chiếu phim: </Text>
                                <Text className='txt-yellow-gray fw-bold font-params fml-endcode-sans-sc ml-4' fontSize={28}>
                                    { nameCinemaSelect }
                                </Text>
                            </div>
                            <Divider />
                            {
                                showtimesByCinema && showtimesByCinema.length > 0 
                                ? showtimesByCinema.map((st, idx) => {
                                    return <ShowTimeItem 
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
