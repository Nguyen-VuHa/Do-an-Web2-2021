import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import globalText from 'src/contants/titleCinema';
import { fetchMovieHomePage } from 'src/reducers/homePageSlice';
import ShowtimesByMovie from '../components/ShowtimesByMovie';
import ShowTimeDetail from '../components/ShowtimesByMovie/ShowTimeDetail';

const ShowtimesByMoviePage = () => {
    const dispatch = useDispatch();  

    useEffect(() => {
        dispatch(fetchMovieHomePage());
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_MOVIE_SHOWTIMES }</title>
                </Helmet>
            </HelmetProvider>
            
            <div>
                <ShowtimesByMovie />
                <ShowTimeDetail />
            </div>
        </>
    );
};

export default ShowtimesByMoviePage;
