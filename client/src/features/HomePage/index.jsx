import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import Advertisement from './components/Advertisement';
import MovieList from './components/MovieList';
import Promotion from './components/Promotion';
import './homepage.scss';
import { getDataHomePage } from './homepageSlice';

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
    }, []);

    return (
        <>
            <Helmet>
                <title>CGV Cinemas Việt Nam | Trang Chủ</title>
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
