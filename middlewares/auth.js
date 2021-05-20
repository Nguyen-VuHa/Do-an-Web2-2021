const asyncHandler = require('express-async-handler');
const UserAccount = require('../models/useraccount');

module.exports =asyncHandler(async function auth(req, res, next) {
    const { userId } = req.session;
    res.locals.currentUser = null;
    if(userId) {
        const user = await UserAccount.findByCode(userId);
        if(user) {
            req.currentUser = user;
            res.locals.currentUser = user;
        }
        next();
    }
    else
    {
        next();
    }
});