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
        allowNull: true
    },
    numberphone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER,
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
    return UserAccount.findOne({
        where: {
            email,
        },
    });
}

UserAccount.findByCode = async function (code) {
    return UserAccount.findOne({
        where: {
            code,
        },
    });
}

UserAccount.findById = async function(id){
    return UserAccount.findByPk(id);
}

UserAccount.findByActive = async function (active) {
    return UserAccount.findOne({
        where: {
            active,
        },
    });
}

UserAccount.finbByAll = async function () {
    return UserAccount.findAll();
}

module.exports = UserAccount;