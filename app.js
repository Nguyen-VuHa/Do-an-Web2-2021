const express = require('express');
const app = express();
// module support
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
//===========================
// Database
const db = require('./models/database');
// Router API in React JS
const route = require('./routers/index');
// ===============================
app.use(cors());
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(express.static('public'));

route(app);

db.sync().then(function () {
    const port = process.env.PORT || 5000;
    console.log(`Server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error);
