const Users = require('../module/Users');
const { hashPass, decryptPass } = require('../../util/hashPass');
const { AccessToken, RefreshToken, setToken } = require('../../util/JWTUtil');

class AuthController {
    // [POST] -/auth/login
    async Login(req, res, next) {
        try {
            const { username, email } = req.body;
            const pass = req.body.password;
            const currentUser = await Users.findOne({
                email,
            });
            if (!currentUser) {
                return res.status(401).json({ message: 'User not found' });
            }
            if (currentUser.username !== username) {
                return res.status(401).json({ message: 'Incorrect username' });
            }
            const passDB = currentUser.password;
            const decryptPassword = await decryptPass(pass, passDB);
            if (!decryptPassword) {
                return res.status(401).json({ message: 'Incorrect password ' });
            }
            const { password, ...other } = currentUser._doc;
            console.log(other);
            const newAccessToken = setToken(res, other);
            return res
                .status(200)
                .json({ data: [other], meta: { newAccessToken } });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    // [POST] -/auth/register
    async register(req, res, next) {
        try {
            const { username, email } = req.body;
            const pass = req.body.password;
            const currentUser = await Users.findOne({
                $or: [{ username }, { email }],
            });
            if (currentUser) {
                return res
                    .status(400)
                    .json({ message: 'user or email has existed' });
            }
            const hash = hashPass(pass);
            const newUser = new Users({
                username,
                email,
                password: hash,
            });
            await newUser.save();
            const { password, ...other } = newUser._doc;
            const newAccessToken = setToken(res, other);
            return res.json({
                data: [other],
                meta: { token: newAccessToken },
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new AuthController();
