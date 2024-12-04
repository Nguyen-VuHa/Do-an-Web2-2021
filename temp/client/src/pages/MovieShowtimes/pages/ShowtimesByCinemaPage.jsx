import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import globalText from 'src/contants/titleCinema';
import { fetchCinemaLocation, fetchSystemCinema } from 'src/reducers/systemCinemaSlice';
import CinemaView from '../components/ShowtimesByCinema/CinemaView';
import PlaceView from '../components/ShowtimesByCinema/PlaceView';
import ShowTimeDetail from '../components/ShowtimesByCinema/ShowTimeDetail';
import { CinemaFilterContextProvider } from '../contexts/CinemaFilterContext';

const ShowtimesByCinemaPage = () => {
    const dispatch = useDispatch(); 
    const { systemCinema, cinemaLocation } = useSelector(state => state.systemCinemaState);

    useEffect(() => {
        const waitDispatch = (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            })
        }

        if(cinemaLocation.length === 0)
            dispatch(fetchCinemaLocation());
        
        waitDispatch(300)
        .then(() => {
            if(systemCinema.length === 0)
                dispatch(fetchSystemCinema());
                
            return waitDispatch(300);
        });

    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_MOVIE_SHOWTIMES_BY_CINEMA }</title>
                </Helmet>
            </HelmetProvider>

            <CinemaFilterContextProvider>
                <PlaceView />
                <CinemaView />
                <ShowTimeDetail />
            </CinemaFilterContextProvider>
        </>
    );
};

export default ShowtimesByCinemaPage;
