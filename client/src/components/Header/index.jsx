import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { getImageUser } from '../../features/UserProfile/profileSlice';
import HeaderLogin from './components/HeaderLogin';
import HeaderUser from './components/HeaderUser';
import './header.scss';

const Header = () => {
    const { state } = useContext(AuthContext);
    const { isLogin } = state;  
    const accessToken = localStorage.getItem('accessToken');
    const [isShowMenu, setIsShowMenu] = useState(false);
    const macth = useRouteMatch();
    const dispatch = useDispatch();
    const [scrollHeight, setscrollHeight] = useState(0);

    useEffect(() => {
        const handleWindowScroll = () => {
            setscrollHeight(window.pageYOffset);
        }

        window.addEventListener('scroll', handleWindowScroll);
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        }
    }, []);
    
    useEffect(() => {
        if(accessToken)
            dispatch(getImageUser(accessToken));
    }, [dispatch, accessToken]);

    const handleShowMenu = () => {
        setIsShowMenu(!isShowMenu);
    }

    return (
        <header className={ scrollHeight >= 90 ? "header hide" : "header"}>
            <nav className="header__content content">
                <a href="/"><img className="logo" src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="Logo App" /></a>
                <div className={isShowMenu ? "btn-menu active" : "btn-menu"} onClick={handleShowMenu}>
                    <i className="fal fa-bars"></i>
                </div>
                <ul className="content__links">
                    <li className={macth.url === '/' ? "item-link active" : "item-link"}>
                        <Link to="/" onClick={() => setIsShowMenu(false)}>Trang Chủ</Link>
                    </li>
                    <li className={macth.url === '/cinema-system' ? "item-link active" : "item-link"}>
                        <Link to="/cinema-system/view" onClick={() => setIsShowMenu(false)}>Hệ Thống Rạp</Link>
                    </li>
                    <li className="item-link">
                        <Link to="/" onClick={() => setIsShowMenu(false)}>Lịch Chiếu</Link>
                    </li>
                    <li className="item-link">
                        <Link to="/" onClick={() => setIsShowMenu(false)}>Khuyến Mãi</Link>
                    </li>
                </ul>
                <div className="content__control">
                    {isLogin ?  <HeaderUser /> : <HeaderLogin />}
                </div>
            </nav>
        </header>
       
    );
};


Header.propTypes = {

};

export default Header;
