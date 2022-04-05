import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import globalText from 'src/contants/titleCinema';
import {
    MainPage
} from './HomePage.Style';
import Advertisement from './Advertisement';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieHomePage } from 'src/reducers/homePageSlice';
import Promotion from './Promotion';
import MovieCurrent from './MovieCurrent';
import MovieComming from './MovieComming';
import LoadingHomePage from 'src/components/LayoutLoading/LoadingHomePage';

const HomePage = () => {
    const { movieTrend } = useSelector(state => state.homepageState);
    const dispatch = useDispatch();
    
    useLayoutEffect(() => {
        if(movieTrend && movieTrend.length === 0)
        {
            dispatch(fetchMovieHomePage());
        }
    }, []);
    
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_HOMEPAGE }</title>
                </Helmet>
            </HelmetProvider>

            { 
                movieTrend && movieTrend.length === 0
                ? <LoadingHomePage /> 
                : <MainPage>
                    <Advertisement />
                    <MovieCurrent />
                    <MovieComming />
                    <Promotion />
                </MainPage> 
            }
            
        </>
    );
};

export default HomePage;
