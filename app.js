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

// if(process.env.NODE_ENV === "appstore") {
//     app.use(express.static(path.join(__dirname, '/client/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//     })
// } else {
//     app.get('/', (req, res) => {
//         res.send('Api Running!');
//     })
// }

const Uuid = require('uuid');

var server = require('http').Server(app);
let comments = [];
let selectedSeats = [];
const io = require('socket.io')(server);

const addSelectedSeats = (arrSeats, socketId, userId, showtimeId) => {
    if(selectedSeats.length > 0) {
        let checkUser = selectedSeats.filter(sl => sl.userId === userId && sl.showtimeId === showtimeId);
        if(checkUser.length > 0) {
            selectedSeats = selectedSeats.map(sl => {
                if(sl?.userId === userId && sl?.showtimeId === showtimeId) {
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
            selectedSeats.push({arrSeats, socketId, userId, showtimeId}) 
    }
    else
        selectedSeats.push({arrSeats, socketId, userId, showtimeId}) 
}

const addSelectedSeatsDataApi = (arrSeats, userId, showtimeId) => { 
    if(selectedSeats.length > 0) { 
        selectedSeats = selectedSeats.map(sl => {
            if(sl?.userId === userId && sl?.showtimeId === showtimeId) {
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


const removeSelectedByUserId = (userId, showtimeId) => {
    selectedSeats = selectedSeats.filter(sl => sl?.userId !== userId || sl?.showtimeId !== showtimeId);
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

    

    socket.on("add_data_booking", ({arrSeats, showtimeId}) => { 
        addSelectedSeatsDataApi(arrSeats, `data-api`, showtimeId);
    });

    socket.on("joinRoom_Booking", ({showtimeId, objSeats, statusRemove = false}) => {
        socket.join(showtimeId);
       
        if(statusRemove) {
            removeSelectedByUserId(objSeats?.userId, showtimeId)
        }
        else {
            addSelectedSeats(objSeats ? objSeats?.arrSeats : [], socket.id, objSeats ? objSeats?.userId : '', showtimeId);
        }

        io.to(showtimeId).emit('get_seats_selected', selectedSeats);
        
        socket.to(showtimeId).emit("get_seats_booking", selectedSeats);
    });

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
        removeSelectedSeats(socket.id);
    });
});

db.sync().then(function () {
    const port = process.env.PORT || 5000;
    console.log(`Server is listening on port ${port}`);
    server.listen(port);
}).catch(console.error);