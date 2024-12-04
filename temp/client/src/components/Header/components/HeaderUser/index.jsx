import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../contants/loginSlice';
import userApi from '../../../../api/userApi';
import Images from '../../../../contants/image';
import moment from 'moment';
import { AuthContext } from '../../../../contexts/authContext';

const HeaderUser = () => {
    const [isNoti, setIsNoti] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [countNotify, setcountNotify] = useState(0);
    const [listNotify, setlistNotify] = useState([]);
    const dispatch = useDispatch();
    const stateImage = useSelector((state) => state.avartar);
    const { state, dispatchAuth } = useContext(AuthContext);
    const { fullname } = state;

    const accessToken = localStorage.getItem('accessToken');

    const handleShowNoti = async () => {
        if(accessToken) {
            if(isNoti === false) {
                const result = await userApi.listNotify(accessToken);
                setlistNotify(result.notify);
                setcountNotify(0);
            }
            setIsNoti(!isNoti);
        }
    }

    const handleShowUser = () => {
        setIsUser(!isUser);
    }

    const handleClickOutside = (event) => {
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

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        dispatchAuth({
            type: 'CLEAR_USER_INFO',
            payload: null,
        })
        localStorage.clear();
    }

    let getCountNotify = async (accessToken) => {
        const result = await userApi.getCountNotify(accessToken);
        setcountNotify(result.count);
    }

    useEffect(() => {
        if(accessToken) {
            getCountNotify(accessToken);
        }
        return () => {
            getCountNotify = null;
        }
    }, [accessToken]);

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
                                    return  <li className="notify_content-item view" key={data.uuid}>
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
                                    return  <li className="notify_content-item view" key={data.uuid}>
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
                <img src={ stateImage.imageUrl ? stateImage.imageUrl : Images.DefaultAvatar } className="avartar-user" alt="not user" />
            </div>
            <div className={isUser ? "menu active" : "menu"} id="menu__profile">
                <h3>{ fullname }<br /><span>Số dư : <b style={{color: '#54ab35'}}>0 E-coin</b></span></h3>
                <ul>
                    <li>
                        <i className="fal fa-user-circle" />
                        <Link to="/my-profile" onClick={() => setIsUser(false)}>My Profile</Link>
                    </li> 
                    <li>
                        <i className="fal far fa-history" />
                        <Link to="/"  onClick={() => setIsUser(false)}>Booking History</Link>
                    </li>   
                    <li>
                        <i className="fal fa-question-circle" />
                        <Link to="/"  onClick={() => setIsUser(false)}>Help</Link>
                    </li>     
                    <li>
                        <i className="fal fa-sign-out" />
                        <Link to="/" onClick={ () => handleLogout()}>Logout</Link>
                    </li>     
                </ul>
            </div>
        </div>
    );
};


HeaderUser.propTypes = {

};


export default HeaderUser;
