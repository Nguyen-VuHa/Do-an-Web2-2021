import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import PageNotFound from '../../components/PageNotFound';
import './movie_detail.scss';
import MovieCurrent from './pages/MovieCurrent';
import MovieCoomingSoon from './pages/MovieCommingSoon';
import { getMovieDetail } from './movieDetailSlice';


const MovieDetail = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieDetail());
    }, [dispatch]);

    return (
        <>
            <Switch>
                <Route exact path="/movie-current" component={PageNotFound} />
                <Route path="/movie-current/:movieId" component={MovieCurrent} />
                <Route exact path="/comming-soon" component={PageNotFound} />
        
                <Route path="/comming-soon/:movieId" component={MovieCoomingSoon} />
            </Switch>
        </>
        
    );
};


MovieDetail.propTypes = {

};


export default MovieDetail;
