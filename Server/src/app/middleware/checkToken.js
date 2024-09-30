const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary');

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
            const { id, role } = data;
            req.userID = id;
            req.role = role;
            next();
        });
    } catch (err) {
        if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
        res.status(500).json({ message: err });
    }
};
const decodeToken = async (token) => {
    try {
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        const decode = await new Promise((resole, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
                if (err) {
                    return reject(new Error({ message: 'token is not valid' }));
                }
                const { id } = data;
                resole(id);
            });
        });
        return decode;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { checkToken, decodeToken };
