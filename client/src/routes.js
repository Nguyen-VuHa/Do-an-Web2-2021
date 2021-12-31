import React from 'react';

// Homepage
const HomePage = React.lazy(() => import('src/pages/HomePage'));
// Register
const Register = React.lazy(() => import('src/pages/Register'));


// array routes
const routes = [
    { path: '/', name: 'HomePage', component: HomePage, exact: true},
    { path: '/auth/register', name: 'HomePage', component: Register, exact: true},
];

export default routes;