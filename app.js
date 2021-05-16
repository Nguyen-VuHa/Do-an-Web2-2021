const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

const profRouter = require('./routers/profile');
const pg404Router = require('./routers/404');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('home');
});

app.use('/prof', profRouter);
app.use('/error', pg404Router);

const port = process.env.PORT || 3000;
console.log(`Server is listening on port ${port}`);
app.listen(port);