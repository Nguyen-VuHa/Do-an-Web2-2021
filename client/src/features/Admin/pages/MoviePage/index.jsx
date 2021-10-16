import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';
import MovieEditor from './pages/MovieEditer';
import MovieView from './pages/MovieView';


const MoviePage = () => {
    return (
        <>
            <Helmet>
                <title>Movie Manager | CGV Việt Nam</title>
            </Helmet>
            <Switch>
                <Redirect exact from="/admin/movie" to="/admin/movie/view"/>

                <Route path="/admin/movie/view">
                    <MovieView />
                </Route>

                <Route path="/admin/movie/editor">
                    <MovieEditor />
                </Route>
            </Switch>
        </>
    );
};


MoviePage.propTypes = {

};


export default MoviePage;
