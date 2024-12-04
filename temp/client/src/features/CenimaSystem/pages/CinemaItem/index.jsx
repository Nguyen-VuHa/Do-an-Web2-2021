import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './cinema_item.scss';
import GLOBAL_TEXT from '../../../../contants/titleCinema';
import Images from '../../../../contants/image';
import { Link } from 'react-router-dom';
import GoogleApiMap from './components/GoogleApiMap';


const CinemaViewContent = ({data}) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    
    return (
        <>
            <Helmet>
                <title>{ data.nameCinema } | { GLOBAL_TEXT.TITLE_CINEMA }</title>
            </Helmet>
            <div className="item-cinema-view">
                <div className="container content">
                    <div className="layout">
                        <div className="layout__header">
                            <Link className="btn-back" to="/cinema-system/view"><i className="fal fa-arrow-circle-left"></i></Link>
                            <h3>Hệ Thống Rạp Phim</h3>
                        </div>
                        <div className="layout__content">
                            <div className="info">
                                <h4>☞ Cụm Rạp: {data.nameCinema}</h4>
                                <div className="line">
                                    <div className="line-effect">
                                        <div className="line-left"></div>
                                        <div className="line-top"></div>
                                    </div>
                                    <span>Địa Điểm</span>
                                    <div className="table-text">
                                        <span>
                                            { `${data.wards}, ${data.district}, ${data.city}`}
                                        </span>
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="line-effect">
                                        <div className="line-left"></div>
                                        <div className="line-top"></div>
                                    </div>
                                    <span>Loại Phòng Chiếu</span>
                                    <div className="table-text">
                                        <span>
                                            { data.typeCinema }
                                        </span>
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="line-effect">
                                        <div className="line-left"></div>
                                        <div className="line-top"></div>
                                    </div>
                                    <span>Liên Hệ Với Chúng Tôi</span>
                                    <div className="table-text">
                                        <span>
                                            1900 2099 bấm phím 6 hoặc gọi 028 3736 7070
                                        </span>
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="line-effect">
                                        <div className="line-left"></div>
                                        <div className="line-top"></div>
                                    </div>
                                    <span>Email Trợ Giúp</span>
                                    <div className="table-text">
                                        <span>
                                            cskh@bhdstar.vn
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="map-api">
                                <div className="map-content">
                                    <GoogleApiMap pointLat={data.pointLat} pointLng={data.pointLng} data={data}/>
                                </div>
                            </div>
                        </div>
                        <div className="banner-ticket">
                            <img src={Images.FARE} alt="Not Banner Ticket"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
       
    );
};


CinemaViewContent.propTypes = {

};


export default CinemaViewContent;
