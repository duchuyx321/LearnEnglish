const jwt = require('jsonwebtoken');
require('dotenv').config();

const decodeAccessToken = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(403).json({ message: 'you are not logged in' });
    }
    jwt.verify(authorization, process.env.ACCESS_TOKEN, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'invalid token' });
        }
        const { _id } = data;
        req.body.userID = _id;
        next();
    });
};
module.exports = decodeAccessToken;
