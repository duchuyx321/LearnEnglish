const jwt = require('jsonwebtoken');
require('dotenv').config();

const decodeAccessToken = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(403).json({ message: 'you are not logged in' });
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'invalid token' });
        }
        const { id } = data;

        req.body.userID = id;
        next();
    });
};
module.exports = decodeAccessToken;
