import React, { useState, useEffect, useContext } from 'react';
import { YellowLight } from 'src/contants/cssContants';
import { Col } from 'src/style-common/Layout.Style';
import { Text } from 'src/style-common/Text.Style';
import { BookTicketContext } from '../../contexts/BookTicketContext';
import ModalConfirmHoldTime from '../ModalConfirmHoldTime';
import { LayoutBasicInfo } from './Payment.Style';

import socketIO from 'socket.io-client';
import { useLocation } from 'react-router-dom';
// const ENDPOINT='ws://localhost:5000';
const ENDPOINT='/';
let socket = socketIO(ENDPOINT, { transports:['websocket']});

const HoldingTime = ({ fare }) => {
    const search = useLocation().search;
    const userId = new URLSearchParams(search).get("userId");
    const showtimeId = new URLSearchParams(search).get("showtimeId");

    const { stateBookTicket, dispatchBookTicket } = useContext(BookTicketContext);
    const { holdingTime } = stateBookTicket;

    const [countDown, setCountDown] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setTimeLeft(holdingTime);
    }, []);

    useEffect(() => {
        if(!holdingTime) 
        {
            socket.emit('joinRoom_Booking', {showtimeId, objSeats: {
                userId: userId,
                arrSeats: [],
            }});
            setIsShow(true);
        }
    }, [holdingTime]);

    useEffect(() => {
        if (!timeLeft){
            return;
        }
    
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
        <>
            <ModalConfirmHoldTime isShow={isShow} setIsShow={setIsShow}/>
            <LayoutBasicInfo className="text-center mt-2">
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
            </LayoutBasicInfo>
        </>

    );
};


export default HoldingTime;
