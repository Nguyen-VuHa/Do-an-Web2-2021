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

Booking.findByIdShow = async function (idShow) {
    return Booking.findAll({
        where: {
            idShow: idShow,
        },
    });
}

module.exports = Booking;