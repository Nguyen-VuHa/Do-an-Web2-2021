const { DataTypes } = require('sequelize');
const db = require('./database');

const District = db.define('District', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


District.findById = async function (id) {
    return District.findOne({
        where: {
            id: id,
        },
    });
}

District.finbByAll = async function () {
    return District.findAll();
}


module.exports = District;