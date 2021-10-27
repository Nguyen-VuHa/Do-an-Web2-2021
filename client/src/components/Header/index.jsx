import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getImageUser } from '../../features/UserProfile/profileSlice';
import HeaderLogin from './components/HeaderLogin';
import HeaderUser from './components/HeaderUser';
import './header.scss';

const Header = () => {
    const isLogin = useSelector((state) => state.isLogin);
    const accessToken = localStorage.getItem('accessToken');
    const macth = useRouteMatch();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(accessToken)
            dispatch(getImageUser(accessToken));
    }, [dispatch, accessToken]);

    return (
        <header className="header">
            <nav className="header__content content">
                <a href="/"><img className="logo" src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="Logo App" /></a>
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
                    {isLogin ?  <HeaderUser /> : <HeaderLogin />}
                </div>
            </nav>
        </header>
       
    );
};


Header.propTypes = {

};

export default Header;
