import React from 'react';
import './footer.scss';
import Images from '../../contants/image';

const Footer = () => {
    return (
        <div className="footer-content">
            <div className="footer-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <ul className="list-unstyled clear-margins">
                            <li className="widget-container widget_nav_menu">
                                <h1 className="title-widget">CGV Việt Nam</h1>
                                <ul>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Giới Thiệu</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Tiện Ích Online</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Thẻ Quà Tặng</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Tuyển Dụng</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Liên Hệ Quảng Cáo CGV</a>
                                </li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <ul className="list-unstyled clear-margins">
                            <li className="widget-container widget_nav_menu">
                                <h1 className="title-widget">Điều Khoản</h1>
                                <ul>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Điều Khoảng Chung</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Điều Khoản Giao Dịch</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Chính Sách Thanh Toán</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Chính Sách Bảo Mật</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Câu Hỏi Thường Gặp</a>
                                </li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <ul className="list-unstyled clear-margins">
                            <li className="widget-container widget_nav_menu">
                                <h1 className="title-widget">Kết Nối CGV</h1>
                                <ul>
                                <li>
                                    <div className="social-menu">
                                    <ul>
                                        <li><a href="https://www.facebook.com/cgvcinemavietnam" target="_blank"><i className="fab fa-facebook-f" style={{opacity: 1}} /></a></li>
                                        <li><a href="https://www.youtube.com/cgvvietnam" target="_blank"><i className="fab fa-youtube" style={{opacity: 1}} /></a></li>
                                        <li><a href="https://www.instagram.com/cgvcinemasvietnam/" target="_blank"><i className="fab fa-instagram" style={{opacity: 1}} /></a></li>
                                        <li><a href="https://zalo.me/1884424922722396289" target="_blank"><i className="fab fa-twitter" style={{opacity: 1}} /></a></li>
                                    </ul>
                                    </div>
                                </li>
                                <li>
                                    <a href="http://online.gov.vn/Home/WebDetails/30270" target="_blank"><img width="100%" style={{marginTop: '20px'}} src={ Images.Image_BTC } alt="" /></a>
                                </li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <ul className="list-unstyled clear-margins">
                            <li className="widget-container widget_nav_menu">
                                <h1 className="title-widget">Chăm Sóc Khách Hàng</h1>
                                <ul>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Hotline: 1900 1006</a>
                                </li>
                                <li>
                                    <a href><i className="fa fa-angle-double-right" /> Giờ Làm Việc 8:00 - 22:00(Tất cả các ngày bao gồm lễ)</a>
                                </li>
                                <li>
                                    <a href="https://mail.google.com/"><i className="fa fa-angle-double-right" /> EMail Hỗ Trợ: cgv.cinema.vn@gmail.com</a>
                                </li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


Footer.propTypes = {

};


export default Footer;
