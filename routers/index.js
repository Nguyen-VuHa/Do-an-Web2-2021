const authRoute = require('./routeAuth');
const movieRoute = require('./routeMovie');
const cinemaRoute = require('./routeCinema');

function route(app) {
    app.use('/auth', authRoute);
    app.use('/api', movieRoute);
    app.use('/api', cinemaRoute);
}

module.exports = route;