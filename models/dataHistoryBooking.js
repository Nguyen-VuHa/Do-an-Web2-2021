const { DataTypes } = require('sequelize');
const db = require('./database');
const Accounts = require('./dataAccount');
const MovieShowTimes = require('./dataShowtimes');

const HistoryBooking = db.define('HistoryBooking', { 
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    bookingTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
});

HistoryBooking.belongsTo(Accounts, {foreignKey: 'HB_idUser'});
Accounts.hasMany(HistoryBooking, {foreignKey: 'HB_idUser'});

HistoryBooking.belongsTo(MovieShowTimes, {foreignKey: 'ST_idShowtime'});
MovieShowTimes.hasMany(HistoryBooking, {foreignKey: 'ST_idShowtime'});

module.exports = HistoryBooking;