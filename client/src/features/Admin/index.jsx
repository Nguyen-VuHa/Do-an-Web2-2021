import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import HeaderAdmin from './components/HeaderAdmin';
import MainPage from './pages/MainPage';
import MoviePage from './pages/MoviePage';


const AdminPage = () => {

    return (
        <Switch>
            <Redirect exact from="/admin" to="/admin/thong-ke"/>

            <Route path="/admin/thong-ke">
                <HeaderAdmin />
                <MainPage />
            </Route>

            <Route path="/admin/movie">
                <HeaderAdmin />
                <MoviePage />
            </Route>

        </Switch>
    );
};


AdminPage.propTypes = {

};


export default AdminPage;
