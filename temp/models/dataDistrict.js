const { DataTypes } = require('sequelize');
const db = require('./database');

const Districts = db.define('R_District', { 
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


module.exports = Districts;