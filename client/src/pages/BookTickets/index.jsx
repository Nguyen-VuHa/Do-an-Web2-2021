import React, { useContext, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import authApi from 'src/api/authApi';
import userApi from 'src/api/userApi';
import globalText from 'src/contants/titleCinema';
import { AuthContext } from 'src/contexts/authContext';
import HeaderLine from './components/HeaderLine';
import { BookTicketContextProvider } from './contexts/BookTicketContext';
import ChooseSeatsPage from './pages/ChooseSeatsPage';
import CompletedBookingPage from './pages/CompletedBookingPage';
import PaymentPage from './pages/PaymentPage';

const BookTicketMain = () => {
    const match = useRouteMatch();
    const { state, dispatchAuth } = useContext(AuthContext);
    const { isLogin } = state;

    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

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
