import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbLayout } from '../MovieDetail.Style';

const Breadcrumb = () => {
    
    return (
        <BreadcrumbLayout className="mt-3">
            <Link to='/'>Trang Chủ</Link>
            <span>/</span>
            <span>Rừng thế mạng</span>
        </BreadcrumbLayout>
    );
};

export default Breadcrumb;
