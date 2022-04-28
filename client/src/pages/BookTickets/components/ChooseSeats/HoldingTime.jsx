import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { YellowLight } from 'src/contants/cssContants';
import { Col } from 'src/style-common/Layout.Style';
import { Text } from 'src/style-common/Text.Style';
import { BookTicketContext } from '../../contexts/BookTicketContext';
import { GroupBoxMovie } from './ChooseSeats.Style';


const HoldingTime = ({ fare }) => {
    const { stateBookTicket, dispatchBookTicket } = useContext(BookTicketContext);
    const { holdingTime } = stateBookTicket;

    const [countDown, setCountDown] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        setTimeLeft(holdingTime);
    }, []);

    useEffect(() => {
        if (!timeLeft) return;
    
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
            dispatchBookTicket({
                type: 'SET_HOLDING_TIME',
                payload: timeLeft - 1,
            })
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        let mind = timeLeft % (60 * 60);
        let minutes = Math.floor(mind / 60);
                
        let secd = mind % 60;
        let seconds = Math.ceil(secd);

        setCountDown(`${minutes.toString().length > 1 ? minutes : `0${minutes}`}:${seconds.toString().length > 1 ? seconds : `0${seconds}`}`)
    }, [timeLeft]);

    return (
        <GroupBoxMovie className="text-center mt-2">
            <Col className='column-2'>
                <div>
                    <Text className='txt-gray-blue span-bold' >Tổng tiền thanh toán</Text>
                    <Text className='txt-gray-blue span-bold' spanColor={YellowLight}><span>{ fare.toLocaleString() } đ</span></Text>
                </div>
                <div>
                    <Text className='txt-gray-blue span-bold'>Thời gian giữ ghế</Text>
                    <Text className='txt-gray-blue span-bold' spanColor={YellowLight}>
                    <span
                        style={timeLeft <= 30 ? {color: 'red'} : {}}
                    >{ countDown }</span>
                    </Text>
                </div>
            </Col>
           
        </GroupBoxMovie>
    );
};


export default HoldingTime;
