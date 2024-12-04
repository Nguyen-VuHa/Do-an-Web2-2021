const { DataTypes } = require('sequelize');
const db = require('./database');

const Ticket = db.define('Ticket', { 
    idTicket: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    idBK: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idSeats: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
})

Ticket.finbByAll = async function () {
    return Ticket.findAll();
}

Ticket.findByIdBK = async function (idBK) {
    return Ticket.findAll({
        where: {
            idBK: idBK,
        },
    });
}

module.exports = Ticket;