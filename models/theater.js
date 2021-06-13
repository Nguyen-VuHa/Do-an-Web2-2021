const { DataTypes } = require('sequelize');
const db = require('./database');

const Theaters = db.define('Theaters', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    idDistr: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nameTheater: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeTheater: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressTheater: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latTheater: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lngTheater: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sizeHorizontal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sizeVertical: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Theaters.findById = async function (id) {
    return Theaters.findOne({
        where: {
            id: id,
        },
    });
}

Theaters.finbByAll = async function () {
    return Theaters.findAll();
}


module.exports = Theaters;