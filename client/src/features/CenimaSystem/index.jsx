import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { getAllCinemas } from './cinemaSystemSlice';
import './cinema_system.scss';
import CinemaViewContent from './pages/CinemaItem';
import CinemaView from './pages/CinemaView';

const CinemaSystem = () => {
    const dispatch = useDispatch();
    const { cinemas } = useSelector((state) => state.cinemas);
    const match = useRouteMatch();

    useEffect(() => {
        dispatch(getAllCinemas());
    }, [dispatch]);

    return (
            <div className="system-cinema">
                <Switch>
                    <Redirect exact from={match.url} to={`${match.url}/view`}/>
                
                    {
                        cinemas.length > 0 ? 
                        <>
                            <Route path={`${match.url}/view`} >
                                <CinemaView />
                            </Route>
                            {
                                cinemas.map(item => {
                                return  <Route key={item.id} path={`${match.url}/cinema/${item.id}`} >
                                            <CinemaViewContent data={item} />
                                        </Route>
                                })
                            }
                        </>
                            
                        : ''
                    }
                </Switch>
            </div>
    );
};


CinemaSystem.propTypes = {

};


export default CinemaSystem;
