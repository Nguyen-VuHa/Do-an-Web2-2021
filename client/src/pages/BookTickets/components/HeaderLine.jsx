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
                {/* <i className="far fa-chevron-right"></i>
                <ButtonHeader>
                    Bắp nước
                    <i className="far fa-shopping-bag"></i>
                </ButtonHeader> */}
                <i className="far fa-chevron-right"></i>
                <ButtonHeader>
                    Thanh toán
                    <i className="fad fa-credit-card"></i>
                </ButtonHeader>
                <i className="far fa-chevron-right"></i>
                <ButtonHeader>
                    Thông tin vé
                    <i className="fad fa-ticket"></i>
                </ButtonHeader>
            </LayoutButton>
        </Header>
    );
};


export default HeaderLine;
