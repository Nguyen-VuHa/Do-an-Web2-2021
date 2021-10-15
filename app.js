const express = require('express');
const app = express();
// module support
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieSession = require('cookie-session');    
const cors = require('cors');
//===========================
// Database
const db = require('./models/database');
const authMiddleware = require('./middlewares/auth');
//===========================
const homeRouter = require('./routers/home');
const profRouter = require('./routers/profile');
const pg404Router = require('./routers/404');
const siguploginRouter = require('./routers/signuplogin');
const adminRouter = require('./routers/adMoreMovies');
const movieDetailRouter = require('./routers/movieDetails');
const cinemaSysRouter = require('./routers/cinemaSystem');
const cinemaViewRouter = require('./routers/cinemaview');
const showTimeRouter = require('./routers/showtimes');
const bookingRouter = require('./routers/bookings');
const ticketRouter = require('./routers/tickets');
// Router API in React JS
const route = require('./routers/index');
// ===============================
app.use(cors());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

route(app);
//Session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'secret'],

    maxAge: 24 * 60 * 60 * 1000
}));
//==========

//==========
app.use(authMiddleware);
app.use('/', homeRouter);
app.use('/prof', profRouter);
app.use('/error', pg404Router);
app.use('/reg', siguploginRouter);
app.use('/admin', adminRouter);
app.use('/movie', movieDetailRouter);
app.use('/cinemas', cinemaSysRouter);
app.use('/cinema-view', cinemaViewRouter);
app.use('/showtimes', showTimeRouter);
app.use('/bookings', bookingRouter);
app.use('/ticket', ticketRouter);

db.sync().then(function () {
    const port = process.env.PORT || 5000;
    console.log(`Server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error);
