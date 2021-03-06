import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../../../../contants/loginSlice';
import { AuthContext } from '../../../../contexts/authContext';

const HeaderAdmin = () => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const { dispatchAuth } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch(logout());
        dispatchAuth({
            type: 'CLEAR_USER_INFO',
            payload: null,
        })
        localStorage.clear();
    }
    return (
        <>
            <header className="header">
                <nav className="header__content content">
                    <a href="/"><img className="logo" src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="Logo App" /></a>
                    <ul className="content__links">
                        <li className={match.url === '/admin/thong-ke' ? "item-link active" : "item-link"}>
                            <Link to="/admin/thong-ke">Thông Kê</Link>
                        </li>
                        <li className={match.url === '/admin/movie' ? "item-link active" : "item-link"}>
                            <Link to="/admin/movie">Quản Lý Phim</Link>
                        </li>
                        <li className={match.url === '/admin/cenima-system' ? "item-link active" : "item-link"}>
                            <Link to="/admin/cenima-system">Quản Lý Cụm Rạp</Link>
                        </li>
                        <li className="item-link">
                            <Link to="/admin/thong-ke">Quản Lý Xuất Chiếu</Link>
                        </li>
                        <li className="item-link" onClick={() => handleLogout()}>
                            <Link to="/">Đăng Xuất</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};


HeaderAdmin.propTypes = {

};


export default HeaderAdmin;
