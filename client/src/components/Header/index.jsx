import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import HeaderLogin from './components/HeaderLogin';
import HeaderUser from './components/HeaderUser';
import './header.scss';

const Header = () => {
    const isLogin = useSelector((state) => state.isLogin);
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
                    {isLogin ?  <HeaderUser /> : <HeaderLogin />}
                </div>
            </nav>
        </header>
       
    );
};


Header.propTypes = {

};

export default Header;
