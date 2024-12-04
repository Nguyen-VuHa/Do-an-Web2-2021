import React from 'react';
import { 
    FooterLayout, WidgetContainer,
    SocialMenu, TitlteWidget
} from './Footer.Style';
import Images from 'src/contants/image';

const Footer = () => {
    return (
        <FooterLayout id='footer-app'>
            <div className="footer-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <ul>
                                <WidgetContainer>
                                    <TitlteWidget>Điều Khoản</TitlteWidget>
                                    <ul>
                                        <li>
                                            <div><i className="fa fa-angle-double-right" /> Điều Khoảng Chung</div>
                                        </li>
                                        <li>
                                            <div><i className="fa fa-angle-double-right" /> Điều Khoản Giao Dịch</div>
                                        </li>
                                        <li>
                                            <div><i className="fa fa-angle-double-right" /> Chính Sách Thanh Toán</div>
                                        </li>
                                        <li>
                                            <div><i className="fa fa-angle-double-right" /> Chính Sách Bảo Mật</div>
                                        </li>
                                        <li>
                                            <div><i className="fa fa-angle-double-right" /> Câu Hỏi Thường Gặp</div>
                                        </li>
                                    </ul>
                                </WidgetContainer>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <ul>
                                <WidgetContainer>
                                    <TitlteWidget>Kết Nối BHD STAR</TitlteWidget>
                                    <ul>
                                        <li>
                                            <SocialMenu>
                                                <ul>
                                                    <li><a href="https://www.facebook.com/BHDStar" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f" style={{opacity: 1}} /></a></li>
                                                    <li><a href="https://www.youtube.com/c/BHDStar" target="_blank" rel="noreferrer"><i className="fab fa-youtube" style={{opacity: 1}} /></a></li>
                                                    <li><a href="https://www.instagram.com/bhdstar.cineplex/" target="_blank" rel="noreferrer"><i className="fab fa-instagram" style={{opacity: 1}} /></a></li>
                                                    <li><a href="https://zalo.me/1884424922722396289" target="_blank" rel="noreferrer"><i className="fab fa-twitter" style={{opacity: 1}} /></a></li>
                                                </ul>
                                            </SocialMenu>
                                        </li>
                                        <li>
                                            <a href="http://online.gov.vn/Home/WebDetails/30270" target="_blank" rel="noreferrer"><img width="100%" style={{marginTop: '20px'}} src={ Images.Image_BTC } alt="" /></a>
                                        </li>
                                    </ul>
                                </WidgetContainer>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <ul>
                                <WidgetContainer>
                                    <TitlteWidget>Chăm Sóc Khách Hàng</TitlteWidget>
                                    <ul>
                                        <li>
                                            <div><i className="fa fa-angle-double-right" /> Hotline: 1900 1006</div>
                                        </li>
                                        <li>
                                            <div><i className="fa fa-angle-double-right" /> Giờ Làm Việc 8:00 - 22:00(Tất cả các ngày bao gồm lễ)</div>
                                        </li>
                                        <li>
                                            <a href="https://mail.google.com/"><i className="fa fa-angle-double-right" /> EMail Hỗ Trợ: cgv.cinema.vn@gmail.com</a>
                                        </li>
                                    </ul>
                                </WidgetContainer>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </FooterLayout>
    );
};

export default Footer;
