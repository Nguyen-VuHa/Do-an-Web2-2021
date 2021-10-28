const express = require('express');
const path = require('path');
const app = express();
// module support
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
//===========================
// Database
const db = require('./models/database');
// Router API in React JS
const route = require('./routers');
// ===============================

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(cors());

route(app);


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api Running!');
    })
}

db.sync().then(function () {
    const port = process.env.PORT || 5000;
    console.log(`Server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error);
