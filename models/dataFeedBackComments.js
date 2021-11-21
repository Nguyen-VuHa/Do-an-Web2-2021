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

FeedbackComments.belongsTo(Accounts, { as: 'ParentComment', foreignKey: 'FbComment_idUser'});
Accounts.hasMany(FeedbackComments, { as: 'ParentComment', foreignKey: 'FbComment_idUser'});

FeedbackComments.belongsTo(Accounts, { as: 'ChildrenComment', foreignKey: 'FbCommentChildren_idUser'});
Accounts.hasMany(FeedbackComments, { as: 'ChildrenComment', foreignKey: 'FbCommentChildren_idUser'});

FeedbackComments.belongsTo(Comments, {foreignKey: 'FbComment_idComment'});
Comments.hasMany(FeedbackComments, {foreignKey: 'FbComment_idComment'});

module.exports = FeedbackComments;