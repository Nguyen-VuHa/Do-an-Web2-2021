import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import globalText from 'src/contants/titleCinema';
import { fetchCinemaLocation, fetchSystemCinema } from 'src/reducers/systemCinemaSlice';
import CinemaView from '../components/ShowtimesByCinema/CinemaView';
import PlaceView from '../components/ShowtimesByCinema/PlaceView';

const ShowtimesByCinemaPage = () => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        const waitDispatch = (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            })
        }

        dispatch(fetchCinemaLocation());

        waitDispatch(300)
        .then(() => {
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

            <PlaceView />
            <CinemaView />
        </>
    );
};

export default ShowtimesByCinemaPage;
