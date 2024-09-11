const Users = require('../module/Users');
const Progress = require('../module/Progress');
const Profile = require('../module/Profile');
const Courses = require('../module/Courses');

class UserController {
    // [GET] -/users/profile-me
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
            return res.status(200).json({
                data: { user: data, profile: profile },
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "'Error must be responded to",
                error,
            });
        }
    }
    // [GET] -/users/combined-me?include=course
    async combinedMe(req, res, next) {
        try {
            const userID = req.userID;
            const { include } = req.query;
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
            const profile = await Profile.findOne({
                userID,
            });
            const progressable_id = await Progress.distinct('progressable_id', {
                userID,
                progressable_type: include,
            });
            const courseIDs = progressable_id.map((item) => item.toString());
            const courses = await Courses.find({
                _id: { $in: courseIDs },
            });
            return res.status(200).json({
                data: { user: data, profile, courses },
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "'Error must be responded to",
                error,
            });
        }
    }
    // [POST] --/users/checkRegister
    async checkRegister(req, res, next) {
        try {
            const { username, email } = req.body;
            if (username !== undefined && username !== '') {
                const user = await Users.findOne({ username });
                if (user) {
                    return res
                        .status(409)
                        .json({ message: 'User already exists' });
                }
            }
            if (email !== undefined && email !== '') {
                const email = await Users.findOne({ email });
                if (email) {
                    return res
                        .status(409)
                        .json({ message: 'Email already exists' });
                }
            }
            return res.status(200).json({ message: 'check successful' });
        } catch (error) {
            res.status(502).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
