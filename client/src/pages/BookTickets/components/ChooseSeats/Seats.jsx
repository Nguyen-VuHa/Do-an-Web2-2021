import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Divider } from 'src/style-common/Layout.Style';
import { BookTicketContext } from '../../contexts/BookTicketContext';
import { LayoutSeat, LayoutSeatInfo, RowSeats, Screen, Seat, SeatInfo, SeatName } from './ChooseSeats.Style';
import socketIO from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { AuthContext } from 'src/contexts/authContext';

const ENDPOINT='ws://localhost:5000';
// const ENDPOINT='/';
let socket =  socketIO(ENDPOINT, { transports:['websocket']});

var charList = (a,z,d=1)=>(a=a.charCodeAt(),z=z.charCodeAt(),[...Array(Math.floor((z-a)/d)+1)].map((_,i)=>String.fromCharCode(a+i*d)));

const Seats = () => {
    const search = useLocation().search;
    const showtimeId = new URLSearchParams(search).get("showtimeId");
    const userId = new URLSearchParams(search).get("userId");

    const { cinemaDetail } = useSelector(state => state.systemCinemaState);
    const { historyBooking } = useSelector(state => state.showtimeState);
    
    const { stateBookTicket, dispatchBookTicket } = useContext(BookTicketContext);
    const { mySeat, seatSelected } = stateBookTicket;

    const [listChar, setListChar] = useState([]);

    useEffect(() => {
        setListChar(charList('A', 'Z'));
    }, []);

    useEffect(() => {
        if(historyBooking) {
            let arrSeat = [];
            historyBooking.forEach(hb => {
                dispatchBookTicket({
                    type: 'SET_SEATS_SELECTED',
                    payload: hb.HistoryTickets.map((s) => { return s.seatsCode}),
                });

                arrSeat = arrSeat.concat(hb.HistoryTickets.map((s) => { return s.seatsCode}));
            });

            let data = {
                userId: `data-api`,
                arrSeats: arrSeat,
            }

            socket.emit('joinRoom_Booking', {showtimeId, objSeats: data});
        }
    }, [historyBooking]);

    const handleSetSelectedSeats = () => {
        socket.on('get_seats_selected', (objSeats) => {
            let checkUser = objSeats.filter(item => item.userId === userId);
            if(checkUser && checkUser.length > 0) {
                dispatchBookTicket({
                    type: 'SET_MY_SEATS',
                    payload: checkUser[0].arrSeats,
                });
            }
            let arrSelected = [];
            objSeats.forEach(obj => {
                if(obj.userId !== userId)
                    arrSelected = arrSelected.concat(obj.arrSeats)
            })
            dispatchBookTicket({
                type: 'SET_SEATS_SELECTED_SOCKET',
                payload: arrSelected,
            });
        });
    }

    useEffect(() => {
        handleSetSelectedSeats();
    }, []);

    useEffect(() => {
        socket.on('get_seats_booking', (objSeats) => {
            let checkUser = objSeats.filter(item => item.userId === userId);
            if(checkUser && checkUser.length > 0) {
                dispatchBookTicket({
                    type: 'SET_MY_SEATS_SOCKET',
                    payload: checkUser[0].arrSeats,
                });
            }
            let arrSelected = [];
            objSeats.forEach(obj => {
                if(obj.userId !== userId)
                    arrSelected = arrSelected.concat(obj.arrSeats)
            })
            dispatchBookTicket({
                type: 'SET_SEATS_SELECTED_SOCKET',
                payload: arrSelected,
            });
        });

    }, [socket]);


    const handleChooseSeats = (seatCode) => {
        let checkSeat = mySeat.filter(s => s === seatCode);
        let checkSeatSelect = seatSelected.filter(s => s === seatCode);
       
        if(checkSeatSelect.length <= 0) {
            let data = {
                userId: userId,
                arrSeats: [],
            }

            if(checkSeat.length > 0) {
                dispatchBookTicket({
                    type: 'REMOVE_MY_SEATS',
                    payload: seatCode,
                });

                data = {
                    ...data,
                    arrSeats: mySeat.filter(m => m !== seatCode)
                }
            }
            else if(checkSeatSelect.length === 0)
            {
                dispatchBookTicket({
                    type: 'SET_MY_SEATS',
                    payload: seatCode,
                });

                data = {
                    ...data,
                    arrSeats: mySeat.concat(seatCode)
                }
            }

            socket.emit('joinRoom_Booking', {showtimeId, objSeats: data});
        }
       
    }

    const horizontalSeats = (charCode) => {
       
        let horizontalElm = [];
        if(cinemaDetail && cinemaDetail.horizontalSize) {

            for(let i = 0; i < cinemaDetail.horizontalSize; i++) {
                let checkSeat = mySeat.filter(s => s === `${charCode}${i + 1}`);
                let checkSeatSelect = seatSelected.filter(s => s === `${charCode}${i + 1}`)
                horizontalElm.push(<Seat 
                    key={i} onClick={() => handleChooseSeats(`${charCode}${i + 1}`)}
                    className={checkSeatSelect.length > 0 ? "choosed hover-none" : checkSeat.length > 0 ? "choose" : ""}
                >
                    {`${charCode}${i + 1}`}
                </Seat>)
            }
        }

        return horizontalElm;
    }

    const elmSeats = () => {
        let bodySeats = [];

        if(cinemaDetail && cinemaDetail.verticalSize && listChar.length > 0) {
            for(let i = 0; i < cinemaDetail.verticalSize; i++) {
                bodySeats.push(<RowSeats key={i}>
                    <SeatName>{listChar[i]}</SeatName>
                    { horizontalSeats(listChar[i]) }
                </RowSeats>)
            }
        }

        return bodySeats;
    }

    return (
        <LayoutSeat>
            <Screen>
                Màng Hình
            </Screen>
            <div className='mt-4'>
                { elmSeats() }
            </div>
            <Divider className='mt-5'/>
            <LayoutSeatInfo>
                <SeatInfo className='choose mr-2'>
                    <Seat className='choose mr-2'>
                        XX
                    </Seat>
                    Ghế đang được chọn
                </SeatInfo>
                <SeatInfo className='mr-2'>
                    <Seat className='mr-2 choosed hover-none' />
                    Ghế đã chọn
                </SeatInfo>
                <SeatInfo>
                    <Seat className='mr-2 hover-none' />
                    Ghế trống
                </SeatInfo>

            </LayoutSeatInfo>
        </LayoutSeat>
    );
};


export default Seats;
