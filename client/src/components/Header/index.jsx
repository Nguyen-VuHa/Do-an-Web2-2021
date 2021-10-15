import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import HeaderLogin from './components';
import './header.scss';

const Header = () => {
    const macth = useRouteMatch();

    return (
        <header className="header">
            <nav className="header__content content">
                <a href="/"><img className="logo" src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png" alt="Logo App" /></a>
                <ul className="content__links">
                    <li className={macth.url === '/' ? "item-link active" : "item-link"}>
                        <Link to="/">Trang Chủ</Link>
                    </li>
                    <li className="item-link">
                        <Link to="/">Hệ Thống Rạp</Link>
                    </li>
                    <li className="item-link">
                        <Link to="/">Lịch Chiếu</Link>
                    </li>
                    <li className="item-link">
                        <Link to="/">Khuyến Mãi</Link>
                    </li>
                </ul>
                <div className="content__control">
                    {/* &lt;% if (currentUser) {'{'} %&gt;
                    <div className="action">
                        <div className="action__notify" id="notify_clicks">
                            <i className="fad fa-bell" id="notify_clicks" />
                            <div className="action__notify-count" id="notify_clicks">
                            </div>
                        </div>
                        <div className="__notify" id="menu__notify">
                            <div className="notify_title">
                            <h4 style={{color: '#a6b2c9', padding: '10px', fontSize: '20px', margin: 0, fontWeight: 600}}>Thông Báo</h4>
                            </div>
                            <div className="scroll_notification" data-simplebar>
                            <ul className="notify_content" id="notify_content">
                            </ul>
                            </div>
                        </div>
                        <div className="profile" id="profile_clicks">
                            <img onerror="this.src='http://localhost:3000/image/user-bg.png'" className="avartar-user" src />
                        </div>
                        <div className="menu" id="menu__profile">
                            <h3>&lt;%- currentUser.fullname %&gt;<br /><span>Số dư :  <b style={{color: '#54ab35'}}>&lt;%- currentUser.surplus.toLocaleString() %&gt; E-coin</b></span></h3>
                            <ul>
                            <li><i className="fal fa-user-circle" /><a href="/prof/<%= currentUser.code %>">My Profile</a></li> 
                            <li><i className="fal far fa-history" /><a href="/history-booking/<%= currentUser.code %>">Booking History</a></li>   
                            <li><i className="fal fa-question-circle" /><a href="#">Help</a></li>     
                            <li><i className="fal fa-sign-out" /><a href="/logout">Logout</a></li>     
                            </ul>
                        </div>
                    </div> */}
                    <HeaderLogin />
                </div>
            </nav>
        </header>
       
    );
};


Header.propTypes = {

};

export default Header;
