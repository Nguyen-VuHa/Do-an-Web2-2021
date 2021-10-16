const authRoute = require('./routeAuth');
const movieRoute = require('./routeMovie');

function route(app) {
    app.use('/auth', authRoute);
    app.use('/api', movieRoute);
}

module.exports = route;