const { DataTypes } = require('sequelize');
const db = require('./database');

const Booking = db.define('Booking', { 
    idBK: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    idUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idShow: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeOfBooking: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
})

Booking.findByIdBK = async function (idBK) {
    return Booking.findOne({
        where: {
            idBK: idBK,
        },
    });
}

Booking.findByIdShow = async function (idShow) {
    return Booking.findAll({
        where: {
            idShow: idShow,
        },
    });
}

Booking.findByIdUser = async function (idUser) {
    return Booking.findAll({
        where: {
            idUser: idUser,
        },
    });
}

module.exports = Booking;