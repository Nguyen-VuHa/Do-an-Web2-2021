const authRoute = require('./routeAuth');

function route(app) {
    app.use('/auth', authRoute);
}

module.exports = route;