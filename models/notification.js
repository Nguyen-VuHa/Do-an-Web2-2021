const { DataTypes } = require('sequelize');
const db = require('./database');

const Notification = db.define('Notification', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    idUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    messbold: {
        type: DataTypes.STRING,
        allowNull: false
    },
    linkimg: {
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
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Notification.findByIdUser = async function (idUser) {
    return Notification.findAll({
        where: {
            idUser: idUser,
        },
        order: [
            ['time', 'DESC'],
        ]
    });
}

Notification.findByIdUserType = async function (idUser, type) {
    return Notification.findAll({
        where: {
            idUser: idUser,
            type: type,
        },
        order: [
            ['time', 'DESC'],
        ]
    });
}

Notification.findByUuid = async function (uuid) {
    return Notification.findOne({
        where: {
            uuid: uuid,
        }
    });
}


Notification.findByUserStatus = async function (idUser, status) {
    return Notification.findAll({
        where: {
            idUser: idUser,
            status: status,
        },
        order: [
            ['time', 'DESC'],
        ]
    });
}



module.exports = Notification;