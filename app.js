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
let comments = [];
let selectedSeats = [];
const io = require('socket.io')(server);

const addSelectedSeats = (arrSeats, socketId, userId) => {
    if(selectedSeats.length > 0) {
        let checkUser = selectedSeats.filter(sl => sl.userId === userId);
        if(checkUser.length > 0) {
            selectedSeats = selectedSeats.map(sl => {
                if(sl?.userId === userId) {
                    return {
                        ...sl, 
                        arrSeats: arrSeats,
                    }
                }
                else {
                    return {...sl}
                }
            })
        }
        else
            selectedSeats.push({arrSeats, socketId, userId}) 
    }
    else
        selectedSeats.push({arrSeats, socketId, userId}) 
}

const addSelectedSeatsDataApi = (arrSeats, userId) => { 
    if(selectedSeats.length > 0) { 
        selectedSeats = selectedSeats.map(sl => {
            if(sl?.userId === userId) {
                return {
                    ...sl, 
                    arrSeats: sl.arrSeats.concat(arrSeats),
                }
            }
            else {
                return {...sl}
            }
        })
    }
}


const removeSelectedByUserId = (userId) => {
    selectedSeats = selectedSeats.filter(sl => sl?.userId !== userId);
}

const removeSelectedSeats = (socketId) => {
    selectedSeats = selectedSeats.filter(sl => sl.socketId !== socketId);
}


const addComments = (idComments, socketId) => {
    !comments.some(comment => comment.idComments === idComments) &&
        comments.push({idComments, socketId})
}

const removeComments = (socketId) => {
    comments = comments.filter(comment => comment.socketId !== socketId);
}

io.on('connection', (socket) => {
    console.log('User connected.');

    socket.emit('get_seats_selected', selectedSeats.filter(sl => sl?.userId !== ''));

    socket.on("add_data_booking", ({arrSeats}) => { 
        addSelectedSeatsDataApi(arrSeats, `data-api`);
    });

    socket.on("joinRoom_Booking", ({showtimeId, objSeats}) => {
        socket.join(showtimeId);

        addSelectedSeats(objSeats ? objSeats?.arrSeats : [], socket.id, objSeats ? objSeats?.userId : '');

        socket.broadcast.emit("get_seats_booking", selectedSeats.filter(sl => sl?.userId !== ''));
    });

    socket.on("addComments", comments => {
        addComments(comments.idComments, socket.id);
    });

    socket.on("joinRoom", ({idComments}) => {
        socket.join(idComments);

        io.to(idComments).emit("getComments", idComments, Uuid.v4());
    });

    socket.on("leave_room_booking", ({userId}) => {
        removeSelectedByUserId(userId);
    });

    socket.on("leaveRoom", ({id}) => {
        socket.leave(id);
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeComments(socket.id);
        removeSelectedSeats(socket.id);
    });
});

db.sync().then(function () {
    const port = process.env.PORT || 5000;
    console.log(`Server is listening on port ${port}`);
    server.listen(port);
}).catch(console.error);