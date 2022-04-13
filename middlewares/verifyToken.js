const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const bearberHeader = req.headers.authorization;
    const token = bearberHeader && bearberHeader.split(' ')[1];
    
    if(!token) return res.status(401).json('You are not authorized');
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = decoded.id;
        next();
    }
    catch(err) {
        return res.status(403).json(err);
    }
}

module.exports = verifyToken;


