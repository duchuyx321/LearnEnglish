const Users = require('../module/Users');
const Progress = require('../module/Progress');
const Profile = require('../module/Profile');

class UserController {
    // [GET] -/users/me
    async getUserProfile(req, res, next) {
        try {
            const userID = req.userID;
            if (!userID) {
                return res
                    .status(403)
                    .json({ message: 'you are not logged in' });
            }
            const user = await Users.findOne({ _id: userID });
            const { password, ...data } = user._doc;
            if (!user) {
                return res.status(404).json({ massage: 'User not found' });
            }
            const profile = await Profile.findOne({ userID });
            const progress = await Progress.find({ userID });
            return res.status(200).json({
                data: { user: data, profile: profile, progress: progress },
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "'Error must be responded to",
                error,
            });
        }
    }
}

module.exports = new UserController();
