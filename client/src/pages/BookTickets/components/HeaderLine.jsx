import React from 'react';
import { ButtonHeader, Header, LayoutButton } from './HeaderLine.Style';


const HeaderLine = () => {
    
    return (
        <Header>
            <LayoutButton className='container'>
                <ButtonHeader className='active'>
                    Chọn ghế
                    <i className="fas fa-th"></i>
                </ButtonHeader>
                <i className="far fa-chevron-right"></i>
                <ButtonHeader
                    className={window.location.pathname.includes('/payment') || window.location.pathname.includes('/succeed') ? 'active' : ''}
                >
                    Thanh toán
                    <i className="fad fa-credit-card"></i>
                </ButtonHeader>
                <i className="far fa-chevron-right"></i>
                <ButtonHeader className={window.location.pathname.includes('/succeed') ? 'active' : ''}>    
                    Hoàn thành đặt vé
                    <i className="fad fa-ticket"></i>
                </ButtonHeader>
            </LayoutButton>
        </Header>
    );
};


export default HeaderLine;
