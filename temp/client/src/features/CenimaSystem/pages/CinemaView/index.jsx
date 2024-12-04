import React, { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GLOBAL_TEXT from '../../../../contants/titleCinema';
import './cinema_view.scss';
import TitleCinema from './components/TitleCinema';
import LoadingPage from '../../../../components/LoadingPage';

const ContentCinema = React.lazy(() => import('./components/ContentCinema'));

const CinemaView = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    
    return (
        <>
            <Helmet>
                <title>{ GLOBAL_TEXT.TITLE_CINEMA } | Hệ Thống Rạp Phim</title>
            </Helmet>
            <div className="cinema-view">
                <TitleCinema />
                <div className="content-cinema">
                    <Suspense fallback={<LoadingPage />} >
                        <ContentCinema />
                    </Suspense>
                    <div className="line-top i1"></div>
                    <div className="line-top i2"></div>
                    <div className="line-left i1"></div>
                    <div className="line-left i2"></div>

                    <div className="line-top i3"></div>
                    <div className="line-top i4"></div>
                    <div className="line-right i1"></div>
                    <div className="line-right i2"></div>
                </div>
            </div>
        </>
      
    );
};


CinemaView.propTypes = {

};


export default CinemaView;
