const { DataTypes } = require('sequelize');
const db = require('./database');

const Films = db.define('R_Movie', {
    movieId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    movieName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    premiereDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    describe: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    directors: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainActor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poster1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    poster2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    poster3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    poster4: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trailer: {
        type: DataTypes.STRING,
        allowNull: true
    }

});

module.exports = Films;