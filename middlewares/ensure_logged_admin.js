module.exports = function ensureLoggedInAdmin(req, res, next) {
    if(!req.currentUser){
        res.redirect('/');
    }
    else
    {
        if(req.currentUser.role === '0')
            next();
        else
            res.render('page404');
    }
}