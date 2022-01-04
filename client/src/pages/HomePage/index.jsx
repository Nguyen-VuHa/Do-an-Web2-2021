import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import globalText from 'src/contants/titleCinema';
import {
    MainPage
} from './HomePage.Style';
import Advertisement from './Advertisement';
import { useDispatch } from 'react-redux';
import { fetchMovieHomePage } from 'src/reducers/homePageSlice';
import Promotion from './Promotion';
import MovieCurrent from './MovieCurrent';
import MovieComming from './MovieComming';

const HomePage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchMovieHomePage());
    }, []);
    
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_HOMEPAGE }</title>
                </Helmet>
            </HelmetProvider>
          
            <MainPage>
                <Advertisement />
                <MovieCurrent />
                <MovieComming />
                <Promotion />
            </MainPage>
        </>
    );
};

export default HomePage;