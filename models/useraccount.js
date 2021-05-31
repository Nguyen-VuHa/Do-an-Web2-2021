const { DataTypes } = require('sequelize');
const db = require('./database');

const UserAccount = db.define('UserAccount', {

    code: {
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.BLOB,
        allowNull: true
    }

});

UserAccount.findByEmail = async function (email) {
    return UserAccount.findOne({
        where: {
            email: email,
        },
    });
}

UserAccount.findByCode = async function (code) {
    return UserAccount.findOne({
        where: {
            code: code,
        },
    });
}

UserAccount.findById = async function(id){
    return UserAccount.findByPk(parseInt(id));
}

UserAccount.finbByAll = async function () {
    return UserAccount.findAll();
}

module.exports = UserAccount;