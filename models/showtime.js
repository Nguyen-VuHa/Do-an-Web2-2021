const { DataTypes } = require('sequelize');
const db = require('./database');

const showTime = db.define('ShowTime', {

    idShowtime: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    idMovies: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCinema: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fare: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

showTime.findById = async function (idShowtime) {
    return showTime.findOne({
        where: {
            idShowtime: idShowtime,
        },
    });
}

showTime.findByIdMovies = async function (idMovies) {
    return showTime.findAll({
        where: {
            idMovies: idMovies,
        },
        order: [
            ['startDate', 'ASC'],
            ['startTime', 'ASC'],
        ]
    });
}

showTime.findByIdCinema = async function (idCinema) {
    return showTime.findAll({
        where: {
            idCinema: idCinema,
        },
        order: [
            ['startDate', 'ASC'],
            ['startTime', 'ASC'],
        ]
    });
}

showTime.finbByAll = async function () {
    return showTime.findAll();
}

module.exports = showTime;