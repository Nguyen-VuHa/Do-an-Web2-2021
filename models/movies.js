const { DataTypes } = require('sequelize');
const db = require('./database');

const Movies = db.define('Movies', {

    movieId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
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
    poster1: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    poster2: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    poster3: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    poster4: {
        type: DataTypes.BLOB,
        allowNull: true
    }

});

Movies.findByEmail = async function (movieName) {
    return Movies.findOne({
        where: {
            movieName: movieName,
        },
    });
}

Movies.findByMovieId = async function (movieId) {
    return Movies.findOne({
        where: {
            movieId: movieId,
        },
    });
}

Movies.finbByAll = async function () {
    return Movies.findAll();
}

module.exports = Movies;