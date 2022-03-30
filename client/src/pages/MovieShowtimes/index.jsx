import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import TabBar from './components/Tabbar';
import ShowtimesByMoviePage from './pages/ShowtimesByMoviePage';

const MovieShowTimes = () => {
    const match = useRouteMatch();

    console.log(match);
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
                        </Switch>
                    </React.Suspense>
                </div>
            </div>
        </>
    );
};

export default MovieShowTimes;
