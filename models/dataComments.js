const { DataTypes } = require('sequelize');
const db = require('./database');
const Accounts = require('./dataAccount');
const Films = require('./dataMovie');

const Comments = db.define('Comments', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pointRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1
    },
    countLike: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})

Comments.belongsTo(Accounts, {foreignKey: 'Comment_idUser'});
Accounts.hasMany(Comments, {foreignKey: 'Comment_idUser'});

Comments.belongsTo(Films, {foreignKey: 'Comment_movieId'});
Films.hasMany(Comments, {foreignKey: 'Comment_movieId'});

module.exports = Comments;