import React from 'react';
import { useHistory } from 'react-router-dom';
import { Green } from 'src/contants/cssContants';
import { Button } from 'src/style-common/Button.Style';
import { Text } from 'src/style-common/Text.Style';

const CompletedBookingPage = () => {
    const history = useHistory();

    return (
        <div className='px-4 text-center' style={{marginTop: '13vh'}}>
            <i className="fas fa-check-circle" style={{color: `${Green}`, fontSize: '350px'}}></i>
            <Text className='fw-600 mt-4 font-params txt-yellow-light' fontSize={22}>Đặt vé xem phim thành công! <br />Xin mời bạn kiểm tra mail hoặc thông báo để xem chi tiết vé!</Text>

            <div className='w-100 d-flex justify-content-center align-items-center mt-3'>
                <Button onClick={() => history.replace('/')}>Về trang chủ</Button>
            </div>
        </div>
    );
};

export default CompletedBookingPage;
