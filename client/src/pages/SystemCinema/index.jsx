import React, { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Layout } from './SystemCinema.Style';
import globalText from 'src/contants/titleCinema';
import Title from './Title';
import ContentCinema from './ContentCinema';
import { useDispatch } from 'react-redux';
import { fetchSystemCinema } from 'src/reducers/systemCinemaSlice';

const MainSystemCinema = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSystemCinema());
    }, []);
    
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_SYSTEM_CINEMA }</title>
                </Helmet>
            </HelmetProvider>
            <Layout>
                <Title />
                <ContentCinema />
            </Layout>
        </>
     
    );
};

export default MainSystemCinema;
