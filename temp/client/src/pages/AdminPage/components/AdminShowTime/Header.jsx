import React, { useContext, useEffect } from 'react';
import { Text } from 'src/style-common/Text.Style';
import { Button } from 'src/style-common/Button.Style';
import { EditShowTimeContext } from '../../contexts/EditShowTimeContext';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createShowTimes, fetchAllShowTimes, setDefaultStatus } from 'src/reducers/showtimeSlice';

const Header = () => {
    const { stateShowtime } = useContext(EditShowTimeContext);
    const { idCinema, idMovie, premiereDate, showTime, fare} = stateShowtime;
    
    const { statusSubmit } = useSelector(state => state.showtimeState);

    const dispatch = useDispatch();

    const checkSubmit = () => {
        if(idCinema && idMovie && premiereDate && showTime && fare)
            return true;
        else
            return false;
    }

    useEffect(() => {
        if(statusSubmit === 1) {
            toast.success('Thêm mới suất chiếu thành công!');
            dispatch(setDefaultStatus());
            dispatch(fetchAllShowTimes());
        }
      
        if(statusSubmit === 2) {
            toast.error('Thêm mới suất chiếu thất bại!');
            dispatch(setDefaultStatus());
        }
    }, [statusSubmit]);

    return (
        <div className='d-flex justify-content-between align-items-center w-100'>
            <Text
                className="txt-green font-params fw-bold" 
                fontSize={30}
            >Quản lý suất chiếu</Text>
            <Button
                onClick={() => {
                    if(checkSubmit()) {
                        dispatch(createShowTimes(stateShowtime))
                    }
                    else
                        toast.warn('Bạn cần nhập đầy đủ thông tin!');
                }}
            >
                Lưu lại
            </Button>
        </div>
    );
};


export default Header;
