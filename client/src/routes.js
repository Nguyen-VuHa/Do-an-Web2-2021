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
const PageNotFound = React.lazy(() => import('src/components/PageNotFound'));
// User Profile 
const UserProfileMain = React.lazy(() => import('src/pages/UserProfile/UserProfileMain'));

// array routes
const routes = [
    { path: '/error/404', name: 'HomePage', component: PageNotFound, exact: true},

    { path: '/', name: 'HomePage', component: HomePage, exact: true},
    { path: '/auth/register', name: 'Register', component: Register, exact: true},

    { path: '/system-cinema/cinema', name: 'System Cinema', component: SystemCinema, exact: true},
    { path: '/system-cinema/detail/:cinemaId/cinema', name: 'System Cinema Detail', component: SystemCinemaDetail, exact: true},

    { path: '/movie/movie-current/:movieId', name: 'Movie Detail Current', component: MovieDetail, exact: true},
    { path: '/movie/movie-comming/:movieId', name: 'Movie Detail CommingSoon', component: MovieDetail, exact: true},
];

export const routesUser = [
    { path: '/profile', name: 'User Profile', component: UserProfileMain, exact: false},
]

export default routes;