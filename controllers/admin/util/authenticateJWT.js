const jwt = require('jsonwebtoken')
const authenticateJWT = (req, res, next) => {
    
    
    if (typeof req.cookies["JWT"]!=='undefined') {
        const token = req.cookies["JWT"];

        jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports = {
    authenticateJWT
}