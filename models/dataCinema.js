const { DataTypes } = require('sequelize');
const db = require('./database');
const Districts = require('./dataDistrict');

const Cinemas = db.define('Cinema', { 
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    nameCinema: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeCinema: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wards: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horizontalSize: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    verticalSize: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pointLat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pointLng: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Cinemas.belongsTo(Districts, {foreignKey: 'C_idArea'});
Districts.hasMany(Cinemas, {foreignKey: 'C_idArea'});

module.exports = Cinemas;