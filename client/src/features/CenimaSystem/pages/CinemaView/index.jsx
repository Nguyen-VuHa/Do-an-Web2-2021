import React from 'react';
import './cinema_view.scss';
import TitleCinema from './components/TitleCinema';
import GLOBAL_TEXT from '../../../../contants/titleCinema';
import { Helmet } from 'react-helmet';
import ContentCinema from './components/ContentCinema';

const CinemaView = () => {
    return (
        <>
            <Helmet>
                <title>{ GLOBAL_TEXT.TITLE_CINEMA } | Hệ Thống Rạp Phim</title>
            </Helmet>
            <div className="cinema-view">
                <TitleCinema />
                <div className="content-cinema">

                    <ContentCinema />

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
