const { DataTypes } = require('sequelize');
const db = require('./database');
const Accounts = require('./dataAccount');
const Comments = require('./dataComments');

const FeedbackComments = db.define('FeedbackComments', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countLike: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})

FeedbackComments.belongsTo(Accounts, {foreignKey: 'FbComment_idUser'});
Accounts.hasMany(FeedbackComments, {foreignKey: 'FbComment_idUser'});

FeedbackComments.belongsTo(Comments, {foreignKey: 'FbComment_idComment'});
Comments.hasMany(FeedbackComments, {foreignKey: 'FbComment_idComment'});

module.exports = Comments;