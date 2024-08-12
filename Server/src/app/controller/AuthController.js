const Users = require('../module/Users');
const { hashPass, decryptPass } = require('../../util/hashPass');
const { AccessToken, RefreshToken } = require('../../util/JWTUtil');

class AuthController {
    // [POST] -/auth/login
    async Login(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const currentUser = await Users.findOne({ email });
            if (!currentUser) {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
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
            const newAccessToken = `Bearer ${AccessToken(other)}`;
            const newRefreshToken = RefreshToken(other);
            res.cookie('RefreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });
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
