const { DataTypes } = require('sequelize');
const db = require('./database');
const HistoryBooking = require('./dataHistoryBooking');

const HistoryTicket = db.define('HistoryTicket', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    seatsCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

HistoryTicket.belongsTo(HistoryBooking, {foreignKey: 'HT_HB_idBooking'});
HistoryBooking.hasMany(HistoryTicket, {foreignKey: 'HT_HB_idBooking'});

module.exports = HistoryTicket;
