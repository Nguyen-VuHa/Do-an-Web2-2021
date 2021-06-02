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
    specific: {
        type: DataTypes.STRING,
        allowNull: false
    },
    describe: {
        type: DataTypes.STRING,
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
    },
    trailer: {
        type: DataTypes.BLOB,
        allowNull: true
    }

});

Movies.findByNameMovie = async function (movieName) {
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

Movies.deleteBymoviesId = async function (movieId) {
    return Movies.destroy({
        where: {
            movieId: movieId,
        }
    })
}

Movies.finbByAll = async function () {
    return Movies.findAll();
}

module.exports = Movies;