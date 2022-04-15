const Comments = require('../models/dataComments');
const UserAccount = require('../models/dataAccount');
const FeedbackComments = require('../models/dataFeedBackComments');
const Films = require('../models/dataMovie');
const queString = require('querystring');

class CommentController { 

    async getComments (req, res) { 
        const params = req.params;
        let url = req.originalUrl.split('?');
        let queryUrl = null;

        if(url.length > 1) 
            queryUrl = queString.parse(url[1]);

        try {
            const data = await Comments.findAll({
                include: [{
                    model: UserAccount,
                    attributes: ['fullname', 'avartar']
                },{
                    model: FeedbackComments,
                    attributes: ['id', 'comments', 'createdAt'],
                    include: [{
                        model: UserAccount,
                        as: 'ParentComment',
                        attributes: ['idUser', 'fullname', 'avartar']
                    },{
                        model: UserAccount,
                        as: 'ChildrenComment',
                        attributes: ['idUser', 'fullname', 'avartar']
                    }]
                }],
                where: {
                    Comment_movieId: params.movieId,
                },
                order: [
                    ["createdAt", "DESC"],
                ],
                limit: queryUrl.pageSize,
                offset: (queryUrl.pageSize * queryUrl.page) - queryUrl.pageSize,
            });

            let totalCount = await Comments.count({
                where: {
                    Comment_movieId: params.movieId,
                },
            })
            
            res.json({status: 200, data, totalPage: Math.ceil(totalCount / queryUrl.pageSize)});
        } catch {
            res.json({status: 200, data: []});
        }
    }

    async addComments (req, res) { 
        const data = req.body;
        Comments.create({
            comments: data.comments,
            pointRating: data.pointRating,
            Comment_idUser: data.idUser,
            Comment_movieId: data.movieId,
        })

        res.json({status: 200});
    }

    async addFeedbackComments (req, res) { 
        const data = req.body;
        FeedbackComments.create({
            comments: data.comments,
            nameTag: data.nameTag,
            FbComment_idUser: data.idUser,
            FbCommentChildren_idUser : data.idChidrenUser ? data.idChidrenUser : null,
            FbComment_idComment: data.idComment,
        })

        res.json({status: 200});
    }
}

module.exports = new CommentController