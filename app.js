const express = require('express');
const app = express();
// module support
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
//===========================
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(expressLayouts);

const homeRouter = require('./routers/home');
const profRouter = require('./routers/profile');
const pg404Router = require('./routers/404');

app.use('/', homeRouter);
app.use('/prof', profRouter);
app.use('/error', pg404Router);

const port = process.env.PORT || 3000;
console.log(`Server is listening on port ${port}`);
app.listen(port);