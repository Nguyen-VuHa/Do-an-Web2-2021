import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import Advertisement from './components/Advertisement';
import MovieList from './components/MovieList';
import Promotion from './components/Promotion';
import './homepage.scss';
import { getDataHomePage } from './homepageSlice';
import GLOBAL_TEXT from '../../contants/titleCinema';

const HomePage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    useEffect(() => {
        dispatch(getDataHomePage());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>{ GLOBAL_TEXT.TITLE_CINEMA } | Trang Chủ</title>
            </Helmet>
            <div className="main-page">
                <Advertisement />
                <MovieList />
                <Promotion />
            </div>
        </>
      
    );
};


HomePage.propTypes = {

};


export default HomePage;
