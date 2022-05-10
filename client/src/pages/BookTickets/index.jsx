import React, { useContext, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import socketIO from 'socket.io-client';
import authApi from 'src/api/authApi';
import userApi from 'src/api/userApi';
import globalText from 'src/contants/titleCinema';
import { AuthContext } from 'src/contexts/authContext';
import HeaderLine from './components/HeaderLine';
import { BookTicketContextProvider } from './contexts/BookTicketContext';
import ChooseSeatsPage from './pages/ChooseSeatsPage';
import CompletedBookingPage from './pages/CompletedBookingPage';
import PaymentPage from './pages/PaymentPage';

const ENDPOINT='ws://localhost:5000';
// const ENDPOINT='/';
let socket;

const BookTicketMain = () => {
    const search = useLocation().search;
    const showtimeId = new URLSearchParams(search).get("showtimeId");
    const userId = new URLSearchParams(search).get("userId");
    
    const match = useRouteMatch();
    const { state, dispatchAuth } = useContext(AuthContext);
    const { isLogin } = state;

    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        socket =  socketIO(ENDPOINT, { transports:['websocket']});

        socket.on('connect', () => {});

        socket.emit('joinRoom_Booking', {showtimeId: showtimeId});
        
        return () => {
            socket.on('disconnect', () => {
                console.log('disconected');
            });
            socket.emit('leaveRoom', {id: showtimeId});

            socket.emit('joinRoom_Booking', {showtimeId, objSeats: {
                userId: userId,
                arrSeats: [],
            }});
        }
    }, []);


    useEffect(() => {
        const fecthDataUser = async (refreshToken) => {
            const dataUser = await authApi.getInfoUser(refreshToken);
        
            if(dataUser.status === 200)
            {
                dispatchAuth({
                    type: 'SET_USER_INFO',
                    payload: dataUser.data,
                })
                
                const numOfNotify = await userApi.getCountNotify(accessToken);

                if(numOfNotify.status === 200) {
                    dispatchAuth({
                        type: 'SET_NUMBER_OF_NOTIFY',
                        payload: numOfNotify.count,
                    })
                }
            }
        }

        if(refreshToken && isLogin === true) {
            fecthDataUser(refreshToken);
        }
    }, [isLogin]);



    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_BOOKING_TICKET }</title>
                </Helmet>
            </HelmetProvider>

            <HeaderLine />
            <div className='w-100 h-auto pt-3'>
                <React.Suspense>
                    <Switch>
                        <Redirect exact={true} from={match.url} to={`${match.url}/choose-seats`} />

                        <BookTicketContextProvider>
                            <Route 
                                path={`${match.url}/choose-seats`}
                                component={ChooseSeatsPage}
                            />

                            <Route 
                                path={`${match.url}/payment`}
                                component={PaymentPage}
                            />

                            <Route 
                                path={`${match.url}/succeed`}
                                component={CompletedBookingPage}
                            />
                        </BookTicketContextProvider>
                        
                    </Switch>
                </React.Suspense>
            </div>
        </>
    );
};

export default BookTicketMain;
