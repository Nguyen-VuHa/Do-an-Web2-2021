import React from 'react';
import { Helmet } from 'react-helmet';
import Advertisement from './components/Advertisement';
import MovieList from './components/MovieList';
import Promotion from './components/Promotion';
import './homepage.scss';

const HomePage = () => {
   
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
