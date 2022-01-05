import React, { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Layout } from './SystemCinema.Style';
import globalText from 'src/contants/titleCinema';
import Title from './Title';
import ContentCinema from './ContentCinema';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSystemCinema } from 'src/reducers/systemCinemaSlice';
import LoadingSystemCinema from 'src/components/LayoutLoading/LoadingSystemCinema';

const MainSystemCinema = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { loading } = useSelector(state => state.systemCinemaState);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSystemCinema());
    }, []);

    useEffect(() => {
        if(loading === false) {
            let timeOut = setTimeout(() => {
                setIsLoading(false);
            }, 800);    

            return () => clearTimeout(timeOut);
        }
    }, [loading]);
    
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_SYSTEM_CINEMA }</title>
                </Helmet>
            </HelmetProvider>

            { isLoading ? <LoadingSystemCinema /> : '' }
            <Layout>
                <Title />
                <ContentCinema />
            </Layout>
        </>
     
    );
};

export default MainSystemCinema;
