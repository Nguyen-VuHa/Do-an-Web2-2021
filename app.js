const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('home');
});

const port = process.env.PORT || 3000;
console.log(`Server is listening on port ${port}`);
app.listen(port);