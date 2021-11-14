const Comments = require('../models/dataComments');
const FeedbackComment = require('../models/dataFeedBackComments');
const UserAccount = require('../models/dataAccount');
const Films = require('../models/dataMovie');

class CommentController { 

    async getComments (req, res) { 
        const params = req.params;
        try {
            const data = await Comments.findAll({
                where: {
                    Comment_movieId: params.movieId,
                }
            });
            
            res.json({status: 200, data});
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
}

module.exports = new CommentController