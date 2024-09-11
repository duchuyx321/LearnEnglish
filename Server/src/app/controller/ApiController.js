const { nanoid } = require('nanoid');
const Token = require('../module/Token');
const TokenService = require('../../service/TokenService');

class ApiController {
    // [POST] --/api/code/sendCode
    async sendCode(req, res, next) {
        try {
            const { email } = req.body;
            const newToken = nanoid(4); // tạo ngẫu nhiên 4 kí tự
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
            const { code, email } = req.body;
            const now = new Date();
            const Code = await Token.findOne({ email, code });
            const timeNow =
                (now.getTime() - Code.createdAt.getTime()) / 1000 / 60;
            if (!Code) {
                return res.status(403).json({ message: 'code not found!' });
            } else {
                if (timeNow > 2) {
                    return res.status(401).json({ message: 'code expired!' });
                }
                return res.status(200).json({ message: 'Successful' });
            }
        } catch (e) {
            res.status(500).json({
                massage: 'you are not code',
                error: e.massage,
            });
        }
    }
}

module.exports = new ApiController();
