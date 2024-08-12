const Users = require('../module/Users');
const Progress = require('../module/Progress');

class UserController {
    // [GET] -/users/@:username
    async getUserProfile(req, res, next) {
        try {
            const { username } = req.params;
            const user = await Users.findOne({ username });
            if (!user) {
                return res.status(404).json({ massage: 'User not found' });
            }
            const { _id } = user._doc;
            const progress = await Progress.findOne({ userID: _id });
            return res.status(200).json({ data: [user, progress] });
        } catch (error) {
            res.status(400).json({
                message: "'Error must be responded to",
                error,
            });
        }
    }
}

module.exports = new UserController();
