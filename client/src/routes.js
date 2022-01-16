import React from 'react';

// Homepage
const HomePage = React.lazy(() => import('src/pages/HomePage'));
// Register
const Register = React.lazy(() => import('src/pages/Register'));
// System Cinema
const SystemCinema = React.lazy(() => import('src/pages/SystemCinema'));
const SystemCinemaDetail = React.lazy(() => import('src/pages/SystemCinemaDetail'));
// Movie Detail
const MovieDetail = React.lazy(() => import('src/pages/MovieDetail'));

// array routes
const routes = [
    { path: '/', name: 'HomePage', component: HomePage, exact: true},
    { path: '/auth/register', name: 'Register', component: Register, exact: true},

    { path: '/system-cinema/cinema', name: 'System Cinema', component: SystemCinema, exact: true},
    { path: '/system-cinema/detail/:cinemaId/cinema', name: 'System Cinema Detail', component: SystemCinemaDetail, exact: true},

    { path: '/movie/movie-current/:idMovie', name: 'Movie Detail Current', component: MovieDetail, exact: true},
    { path: '/movie/movie-comming/:idMovie', name: 'Movie Detail CommingSoon', component: MovieDetail, exact: true},
];

export default routes;