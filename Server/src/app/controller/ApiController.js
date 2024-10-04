const Token = require('../module/Token');
const Users = require('../module/Users');
const TokenService = require('../../service/TokenService');
const { setToken } = require('../../util/JWTUtil');

class ApiController {
    // [POST] --/api/code/sendCode
    async sendCode(req, res, next) {
        try {
            const { nanoid } = await import('nanoid');
            const { email } = req.body;
            const newToken = nanoid(6).toUpperCase(); // tạo ngẫu nhiên 4 kí tự
            if (!email) {
                return res.status(400).json({
                    massage: 'mail not found',
                    error: e.message,
                });
            }
            const Response = await TokenService.sendEmailCode(email, newToken);
            const mail = Response.accepted[0];

            const newCode = new Token({
                email: mail,
                token: newToken,
            });
            await newCode.save();
            res.status(200).json({ message: 'Token sent successfully' });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'you are not code',
                error: e.message,
            });
        }
    }
    // [POST] --/api/code/checkCode
    async checkCode(req, res, next) {
        try {
            const { token, email } = req.body;
            const now = new Date();
            const tokenDb = await Token.findOne({ email, token });
            console.log(tokenDb);
            if (!tokenDb) {
                return res.status(403).json({ message: 'code not found!' });
            }
            const timeNow =
                (now.getTime() - tokenDb.createAt.getTime()) / 1000 / 60;

            if (timeNow > 2) {
                return res.status(401).json({ message: 'code expired!' });
            }
            return res.status(200).json({ message: 'Successful' });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                massage: 'you are not code',
                error: e.massage,
            });
        }
    }
    // [POST] --/api/auth/
    async ggCallback(req, res, next) {
        try {
            const { _id } = req.body;
            if (!_id) {
                return res.status(404).json({ message: 'not id available' });
            }
            const user = await Users.findOne({ _id });
            if (!user) {
                return res.status(403).json({ message: 'user not found' });
            }
            const AccessToken = await setToken(res, user);
            const { password, ...other } = user._doc;
            res.status(200).json({
                data: { ...other, meta: { token: AccessToken } },
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

module.exports = new ApiController();
