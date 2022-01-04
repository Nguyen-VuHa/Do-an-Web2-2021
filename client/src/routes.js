import React from 'react';

// Homepage
const HomePage = React.lazy(() => import('src/pages/HomePage'));
// Register
const Register = React.lazy(() => import('src/pages/Register'));
// System Cinema
const SystemCinema = React.lazy(() => import('src/pages/SystemCinema'));


// array routes
const routes = [
    { path: '/', name: 'HomePage', component: HomePage, exact: true},
    { path: '/auth/register', name: 'Register', component: Register, exact: true},
    { path: '/system-cinema/cinema', name: 'System Cinema', component: SystemCinema, exact: true},
];

export default routes;