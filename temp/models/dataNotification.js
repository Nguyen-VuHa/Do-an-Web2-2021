const { DataTypes } = require('sequelize');
const db = require('./database');
const Accounts = require('./dataAccount');

const NewNotification = db.define('NewNotification', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    messageType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

NewNotification.belongsTo(Accounts, {foreignKey: 'noti_idUser'});
Accounts.hasMany(NewNotification, {foreignKey: 'noti_idUser'});

module.exports = NewNotification;