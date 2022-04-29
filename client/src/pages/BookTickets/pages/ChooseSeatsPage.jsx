import React, { useContext, useEffect } from 'react';
import Seats from '../components/ChooseSeats/Seats';
import MovieInfo from '../components/ChooseSeats/MovieInfo';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMovieDetailById } from 'src/reducers/movieSlice';
import { fetchCinemaDetailById } from 'src/reducers/systemCinemaSlice';
import { fetchShowtimesById } from 'src/reducers/showtimeSlice';
import { BookTicketContext } from '../contexts/BookTicketContext';

const ChooseSeatsPage = () => {
    const search = useLocation().search;
    const dispatch = useDispatch();
    const { dispatchBookTicket } = useContext(BookTicketContext);

    
    useEffect(() => {
        const movieId = new URLSearchParams(search).get("movieId");
        const cinemaId = new URLSearchParams(search).get("cinemaId");
        const showtimeId = new URLSearchParams(search).get("showtimeId");

        dispatchBookTicket({
            type: 'SET_UNVALED_SEATS_SELECTED',
            payload: null,
        })

        const waitDispatch = (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            })
        }

        if(movieId) {
            dispatch(getMovieDetailById(movieId))
        }

        if(cinemaId && showtimeId) {
            waitDispatch(300)
            .then(() => {
                dispatch(fetchCinemaDetailById(cinemaId));
                return waitDispatch(300);
            })
            .then(() => {
                dispatch(fetchShowtimesById(showtimeId));
                return waitDispatch(300);
            })
        }

    }, []);

    return (
        <div className='px-4 d-flex' style={{marginTop: '10vh'}}>
            <Seats />
            <MovieInfo />
        </div>
    );
};

export default ChooseSeatsPage;
