const { DataTypes } = require('sequelize');
const db = require('./database');

const ToUpCard = db.define('ToUpCard', { 
    idUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCard: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Denominations: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },  
    dayTrading: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tradingHours: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


ToUpCard.findByIdUser = async function (idUser) {
    return ToUpCard.findAll({
        where: {
            idUser: idUser,
        },
    });
}

ToUpCard.finbByAll = async function () {
    return ToUpCard.findAll();
}

module.exports = ToUpCard;