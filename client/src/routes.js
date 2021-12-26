import React from 'react';

// Homepage
const HomePage = React.lazy(() => import('src/pages/HomePage'));


// array routes
const routes = [
    { path: '/', name: 'HomePage', component: HomePage, exact: true},
];

export default routes;