const { DataTypes } = require('sequelize');
const db = require('./database');

const UserAccount = db.define('UserAccount', {
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
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avartar: {
        type: DataTypes.BLOB,
        allowNull: true
    }
});

UserAccount.findByEmail = async function (email) {
    return User.findOne({
        where: {
            email,
        },
    });
}

UserAccount.findById = async function(id){
    return User.findByPk(id);
}

UserAccount.findByActive = async function (active) {
    return User.findOne({
        where: {
            active,
        },
    });
}

UserAccount.finbByAll = async function () {
    return Newsfeed.findAll();
}

module.exports = UserAccount;