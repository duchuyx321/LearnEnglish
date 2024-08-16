const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res
                .status(401)
                .json({ message: 'Token not found or invalid format' });
        }
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'token is not valid' });
            }
            const { id } = data;
            req.userID = id;
            console.log(req.body);
            next();
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { checkToken };
