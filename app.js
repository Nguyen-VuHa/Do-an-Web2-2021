const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const route = require('./routers');
const cors = require('cors');
require('dotenv').config();

const db = require('./models/database');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(cors());

route(app);


if(process.env.NODE_ENV === "appstore") {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api Running!');
    })
}

const Uuid = require('uuid');

var server = require('http').Server(app);
//var http = require('http').createServer(app);
let comments = [];
const io = require('socket.io')(server);
// const io = require('socket.io')(8900, {
//     cors: {
//         //origin: "https://bibi-cosmetic-store.herokuapp.com/",
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         transports: [ "websocket", "polling" ],
//     }
// });

const addComments = (idComments, socketId) => {
    !comments.some(comment => comment.idComments === idComments) &&
        comments.push({idComments, socketId})
}

const removeComments = (socketId) => {
    comments = comments.filter(comment => comment.socketId !== socketId);
}

const getIdComment = (idComments) => {
    return comments.find(comment => comment.idComments === idComments);
}

io.on('connection', (socket) => {
    console.log('User connected.');

    socket.on("addComments", comments => {
        addComments(comments.idComments, socket.id);
    });

    socket.on("joinRoom", ({idComments}) => {
        socket.join(idComments);

        io.to(idComments).emit("getComments", idComments, Uuid.v4());
    });

    socket.on("leaveRoom", ({id}) => {
        socket.leave(id);
    });

    
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeComments(socket.id);
    });
});

db.sync().then(function () {
    const port = process.env.PORT || 5000;
    console.log(`Server is listening on port ${port}`);
    // http.listen(port);
    server.listen(port);
}).catch(console.error);