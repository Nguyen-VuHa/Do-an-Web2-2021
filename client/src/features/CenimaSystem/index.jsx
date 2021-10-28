import React, { useEffect } from 'react';
import './cinema_system.scss';
import { Switch, Redirect, Route } from 'react-router-dom';
import CinemaView from './pages/CinemaView';
import { useDispatch } from 'react-redux';
import { getAllCinemas } from './cinemaSystemSlice';

const CinemaSystem = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCinemas());
    }, [dispatch]);

    return (
        <div className="system-cinema">
            <Switch>
                <Redirect exact from="/cinema-system" to="/cinema-system/view"/>

                <Route path="/cinema-system/view" component={CinemaView}/>
                
            </Switch>
        </div>
    );
};


CinemaSystem.propTypes = {

};


export default CinemaSystem;
