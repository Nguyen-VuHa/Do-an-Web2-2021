import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../contants/loginSlice';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import userApi from '../../../../api/userApi';
import Images from '../../../../contants/image';
import moment from 'moment';

const HeaderUser = () => {
    const [isNoti, setIsNoti] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [countNotify, setcountNotify] = useState(0);
    const [listNotify, setlistNotify] = useState([]);
    const [linkImg, setlinkImg] = useState('');
    const dispatch = useDispatch();

    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const accessToken = localStorage.getItem('accessToken');

    const handleShowNoti = async () => {
        if(accessToken) {
            const result = await userApi.listNotify(accessToken);
            setlistNotify(result.notify);
            setcountNotify(0);
            setIsNoti(!isNoti);
        }
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

    const getCountNotify = async (accessToken) => {
        const result = await userApi.getCountNotify(accessToken);
        setcountNotify(result.count);
        setlinkImg(result.imgLink);
    }

    useEffect(() => {
        if(accessToken) {
            getCountNotify(accessToken);
        }
    }, []);

    return (
        <div className="action">
            <div className="action__notify" id="notify_clicks" onClick={() => handleShowNoti()}>
                <i className="fal fa-bells"></i>
                <div className="action__notify-count" id="notify_clicks">
                    <span>{ countNotify === 0 ? '' : countNotify > 9 ? '9+' : countNotify} </span>
                </div>
            </div>
            <div className={isNoti ? "__notify active" : "__notify"} id="menu__notify">
                <div className="notify_title">
                    <h4 style={{color: '#a6b2c9', padding: '10px', fontSize: '20px', margin: 0, fontWeight: 600}}>Thông Báo</h4>
                </div>
                <div className="scroll_notification" data-simplebar style={{width: '100%', maxHeight: '500px'}}>
                    <ul className="notify_content" id="notify_content">
                        {
                            listNotify && listNotify.map((data) => {
                                moment.locale('vi');
                                const momentTime =  moment(data.time).fromNow();
                                if(data.messageType === 'Wellcome') {
                                    return  <li className="notify_content-item view" uuid="01725780-ddb2-11eb-9216-695a4c3ddb75">
                                                <div className="image_item">
                                                    <img src={data.image ? data.image : Images.DefaultAvatar} alt="Not User" style={{width: '60px', height: '60px', objectFit: 'contain', borderRadius: '50%'}} />
                                                </div>
                                                <div className="item--content"> 
                                                    <div>
                                                    <p dangerouslySetInnerHTML={{__html: data.message }}></p>
                                                    </div>
                                                    <div className="notificatio__time">
                                                        { momentTime }
                                                    </div>
                                                </div>
                                            </li>
                                } else {
                                    return  <li className="notify_content-item view" uuid="876c3550-ded8-11eb-b430-997f27dca0da" onclick="infoTicket(this)">
                                                <div className="image_item">
                                                    <img src="https://cgv-cinema-movie.herokuapp.com/api/image/F0xXBTK/1" alt="" />
                                                </div>
                                                <div className="item--content"> 
                                                    <div>
                                                    <p>Bạn vừa hoàn thành đặt vé cho bộ phim <span>BÀN TAY DIỆT QUỶ</span>. Kiểm tra gmail hoặc tin nhắn để nhận mã vé cũng như thông tin về vé. Chúc bạn xem phim vui vẻ &lt;3</p>
                                                    </div>
                                                    <div className="notificatio__time">
                                                    3 tháng trước
                                                    </div>
                                                </div>
                                            </li>
                                } 
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="profile" id="profile_clicks"  onClick={() => handleShowUser()}>
                <img src={ linkImg ? linkImg : Images.DefaultAvatar } className="avartar-user" alt="not user" />
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
