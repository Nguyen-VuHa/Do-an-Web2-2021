const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

const profRouter = require('./routers/profile');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('home');
});

app.use('/prof', profRouter);

const port = process.env.PORT || 3000;
console.log(`Server is listening on port ${port}`);
app.listen(port);