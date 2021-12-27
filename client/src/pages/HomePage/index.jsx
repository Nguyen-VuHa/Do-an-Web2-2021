import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import globalText from 'src/contants/titleCinema';
import {
    MainPage
} from './HomePage.Style';
import Advertisement from './Advertisement';
import { useDispatch } from 'react-redux';
import { fetchMovieHomePage } from 'src/reducers/homePageSlice';
import Promotion from './Promotion';

const HomePage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchMovieHomePage());
    }, []);
    return (
        <>
            <Helmet>
                <title>{ globalText.TITLE_HOMEPAGE }</title>
            </Helmet>
            <MainPage>
                <Advertisement />
                <Promotion />
            </MainPage>
        </>
    );
};

export default HomePage;
