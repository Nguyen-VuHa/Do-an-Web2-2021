const authRoute = require('./routeAuth');
const movieRoute = require('./routeMovie');
const cinemaRoute = require('./routeCinema');
const userRoute = require('./routeUser');
const commentRoute = require('./routeComment');

function route(app) {
    app.use('/auth', authRoute);
    app.use('/api', movieRoute);
    app.use('/api', cinemaRoute);
    app.use('/api', userRoute);
    app.use('/api', commentRoute);
}

module.exports = route;