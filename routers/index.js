const authRoute = require('./routeAuth');
const movieRoute = require('./routeMovie');
const cinemaRoute = require('./routeCinema');
const userRoute = require('./routeUser');
const commentRoute = require('./routeComment');
const showTimesRoute = require('./routeShowtimes');
const historyBookingRoute = require('./routeHistoryBooking');

function route(app) {
    app.use('/auth', authRoute);
    app.use('/api', movieRoute);
    app.use('/api', cinemaRoute);
    app.use('/api', userRoute);
    app.use('/api', commentRoute);
    app.use('/api', commentRoute);
    app.use('/api', showTimesRoute);
    app.use('/api', historyBookingRoute);
}

module.exports = route;