const { DataTypes } = require('sequelize');
const db = require('./database');
const Accounts = require('./dataAccount');

const ImageUsers = db.define('ImageUsers', { 
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

ImageUsers.belongsTo(Accounts, {foreignKey: 'Img_idUser'});
Accounts.hasMany(ImageUsers, {foreignKey: 'Img_idUser'});

module.exports = ImageUsers;