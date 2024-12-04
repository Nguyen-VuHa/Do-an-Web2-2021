import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import TabBar from './components/Tabbar';
import ShowtimesByCinemaPage from './pages/ShowtimesByCinemaPage';
import ShowtimesByMoviePage from './pages/ShowtimesByMoviePage';

const MovieShowTimes = () => {
    const match = useRouteMatch();

    return (
        <>
            <div>
                <TabBar />
                <div className="mt-3">
                    <React.Suspense>
                        <Switch>
                            {/* <Redirect from={`${match.url}`} to={`${match.url}/showtimes-by-movie`}/> */}

                            <Route 
                                path={`${match.url}/showtimes-by-movie`}
                                render={props => (
                                    <ShowtimesByMoviePage {...props} />
                                )}
                            />

                            <Route 
                                path={`${match.url}/showtimes-by-cinema`}
                                render={props => (
                                    <ShowtimesByCinemaPage {...props} />
                                )}
                            />

                        </Switch>
                    </React.Suspense>
                </div>
            </div>
        </>
    );
};

export default MovieShowTimes;
