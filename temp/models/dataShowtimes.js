const { DataTypes } = require('sequelize');
const db = require('./database');
const Cinemas = require('./dataCinema');
const Films = require('./dataMovie');

const MovieShowTimes = db.define('MovieShowTime', { 
    idShowtime: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },
    premiereDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    showTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fare: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

MovieShowTimes.belongsTo(Cinemas, {foreignKey: 'showTime_idCinema'});
Cinemas.hasMany(MovieShowTimes, {foreignKey: 'showTime_idCinema'});

MovieShowTimes.belongsTo(Films, {foreignKey: 'showTime_idMovie'});
Films.hasMany(MovieShowTimes, {foreignKey: 'showTime_idMovie'});


module.exports = MovieShowTimes;