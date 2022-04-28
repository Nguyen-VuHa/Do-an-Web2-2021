import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import globalText from 'src/contants/titleCinema';
import HeaderLine from './components/HeaderLine';
import { BookTicketContextProvider } from './contexts/BookTicketContext';
import ChooseSeatsPage from './pages/ChooseSeatsPage';
import PaymentPage from './pages/PaymentPage';

const BookTicketMain = () => {
    const match = useRouteMatch();
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
                        </BookTicketContextProvider>
                        
                    </Switch>
                </React.Suspense>
            </div>
        </>
    );
};

export default BookTicketMain;
