import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../contants/loginSlice';

const HeaderUser = () => {
    const [isNoti, setIsNoti] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const dispatch = useDispatch();

    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const handleShowNoti = () => {
        setIsNoti(!isNoti);
    }

    const handleShowUser = () => {
        setIsUser(!isUser);
    }

    useEffect(() => {
        window.onclick = function (event) { 
            if(!$(event.target).closest('.action__notify').length) {
                if(!$(event.target).closest('.__notify').length) {
                    setIsNoti(false);
                }
            }
            if(!$(event.target).closest('.profile').length) {
                if(!$(event.target).closest('.menu').length) {
                    setIsUser(false);
                }
            }
        }
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
    }

    return (
        <div className="action">
            <div className="action__notify" id="notify_clicks" onClick={() => handleShowNoti()}>
                <i className="fal fa-bells"></i>
                <div className="action__notify-count" id="notify_clicks">
                    <span>1</span>
                </div>
            </div>
            <div className={isNoti ? "__notify active" : "__notify"} id="menu__notify">
                <div className="notify_title">
                <h4 style={{color: '#a6b2c9', padding: '10px', fontSize: '20px', margin: 0, fontWeight: 600}}>Thông Báo</h4>
                </div>
                <div className="scroll_notification" data-simplebar>
                <ul className="notify_content" id="notify_content">

                </ul>
                </div>
            </div>
            <div className="profile" id="profile_clicks"  onClick={() => handleShowUser()}>
                <img src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-1/cp0/p80x80/197356349_1664333703776554_5774747963175226297_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ln1bO6zKRpgAX9Au63w&_nc_ht=scontent.fsgn5-8.fna&oh=44382ccd98f5cf73e2dad2f00692e10b&oe=618EC3BB" className="avartar-user" alt="not user" />
            </div>
            <div className={isUser ? "menu active" : "menu"} id="menu__profile">
                <h3>{userInfo.fullname}<br /><span>Số dư : <b style={{color: '#54ab35'}}>0 E-coin</b></span></h3>
                <ul>
                    <li>
                        <i className="fal fa-user-circle" />
                        <Link to="/">My Profile</Link>
                    </li> 
                    <li>
                        <i className="fal far fa-history" />
                        <Link to="/">Booking History</Link>
                    </li>   
                    <li>
                        <i className="fal fa-question-circle" />
                        <Link to="/">Help</Link>
                    </li>     
                    <li>
                        <i className="fal fa-sign-out" />
                        <Link to="/" onClick={ () => handleLogout() }>Logout</Link>
                    </li>     
                </ul>
            </div>
        </div>
    );
};


HeaderUser.propTypes = {

};


export default HeaderUser;
