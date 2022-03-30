import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import globalText from 'src/contants/titleCinema';
import { fetchCinemaLocation } from 'src/reducers/systemCinemaSlice';
import PlaceView from '../components/ShowtimesByCinema/PlaceView';


const ShowtimesByCinemaPage = () => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(fetchCinemaLocation());
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_MOVIE_SHOWTIMES_BY_CINEMA }</title>
                </Helmet>
            </HelmetProvider>

            <PlaceView />
        </>
    );
};

export default ShowtimesByCinemaPage;
