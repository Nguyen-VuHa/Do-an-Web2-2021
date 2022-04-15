import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import globalText from 'src/contants/titleCinema';
import HeaderLine from './components/HeaderLine';
import ChooseSeatsPage from './pages/ChooseSeatsPage';

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

                        <Route 
                            path={`${match.url}/choose-seats`}
                            component={ChooseSeatsPage}
                        />
                    </Switch>
                </React.Suspense>
            </div>
        </>
    );
};

export default BookTicketMain;
