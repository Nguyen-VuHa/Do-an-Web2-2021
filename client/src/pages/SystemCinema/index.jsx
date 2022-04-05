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
    const [isLoading, setIsLoading] = useState(false);
    const { loading, systemCinema } = useSelector(state => state.systemCinemaState);

    const dispatch = useDispatch();

    useEffect(() => {
        if(systemCinema && systemCinema.length === 0)
            dispatch(fetchSystemCinema());
    }, []);

    useEffect(() => {
        if(loading === false) {
            let timeOut = setTimeout(() => {
                setIsLoading(false);
            }, 800);    

            return () => clearTimeout(timeOut);
        }
        else    
            setIsLoading(loading);
    }, [loading]);
    
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_SYSTEM_CINEMA }</title>
                </Helmet>
            </HelmetProvider>

            { 
                systemCinema && systemCinema.length === 0 
                ? <LoadingSystemCinema /> 
                : <Layout>
                    <Title />
                    <ContentCinema />
                </Layout> 
            }
            
        </>
     
    );
};

export default MainSystemCinema;
