const { DataTypes } = require('sequelize');
const db = require('./database');

const Accounts = db.define('Account', {
    idUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numberphone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avartar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    surplus: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Accounts;