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

app.use(cors());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expressLayouts);

//Session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'secret'],

    maxAge: 24 * 60 * 60 * 1000
}));

app.use(authMiddleware);
app.use('/', homeRouter);
app.use('/prof', profRouter);
app.use('/error', pg404Router);
app.use('/reg', siguploginRouter);


db.sync().then(function () {
    const port = process.env.PORT || 3000;
    console.log(`Server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error);
