const { DataTypes } = require('sequelize');
const Accounts = require('./dataAccount');
const db = require('./database');

const WalletPersonal = db.define('WalletPersonal', { 
    idCard: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seriNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    denominations: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tradingHours: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

WalletPersonal.belongsTo(Accounts, {foreignKey: 'toUpCard_idUser'});
Accounts.hasMany(WalletPersonal, {foreignKey: 'toUpCard_idUser'});

module.exports = WalletPersonal;