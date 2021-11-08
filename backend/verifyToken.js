const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.token;

    if(authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECERT, (err, user) => {
            if(err) {
                res.status(403).json("invalid verify token");
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        return res.status(402).json("you are not authendicated");
    }
}

module.exports = verifyToken;