import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({ movieName, type }) => {
    return (
        <div className="sider-bar">
            <Link to='/'>Trang Chủ</Link>
            <span>/</span>
            {
                type === 1 ?  <Link to='/'>Phim Đang Chiếu</Link> : <Link to='/'>Phim Sắp Chiếu</Link>
            }
            <span>/</span>
            <span>{movieName}</span>
        </div>
    );
};


SideBar.propTypes = {

};


export default SideBar;
