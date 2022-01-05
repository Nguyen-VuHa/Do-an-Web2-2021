import React, { useEffect, useState } from 'react';
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
    const { loading } = useSelector(state => state.homepageState);
    const [isLoading, setIsLoading] = useState(true);

    console.log(loading);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchMovieHomePage());
    }, []);

    useEffect(() => {
        if(loading === false) {
            let timeOut = setTimeout(() => {
                setIsLoading(false);
            }, 500);

            return () => clearTimeout(timeOut);
        }
    }, [loading]);
    
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_HOMEPAGE }</title>
                </Helmet>
            </HelmetProvider>

            { isLoading ? <LoadingHomePage /> : '' }
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
