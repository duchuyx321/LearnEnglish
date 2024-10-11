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
    // [GET] -/users/@:username?include=course&page=1&limit=5
    async combinedMe(req, res, next) {
        try {
            const { username } = req.params;
            const { include, page, limit } = req.query;
            const skip = (page - 1) * limit;
            if (!username) {
                return res
                    .status(403)
                    .json({ message: 'you are not logged in' });
            }
            const user = await Users.findOne({ username });
            if (!user) {
                return res.status(404).json({ massage: 'User not found' });
            }
            const { password, ...data } = user._doc;
            const profile = await Profile.findOne({
                userID: user._id,
            });
            const progressRecords = await Progress.find({
                userID: user._id,
                progressable_type: include,
            })
                .skip(skip)
                .limit(parseInt(limit)); // Đảm bảo chuyển đổi limit thành số nguyên

            // Lấy danh sách distinct progressable_id từ kết quả trả về
            const progressable_ids = [
                ...new Set(
                    progressRecords.map((item) =>
                        item.progressable_id.toString(),
                    ),
                ),
            ];
            const courses = await Courses.find({
                _id: { $in: progressable_ids },
            });
            return res.status(200).json({
                data: { user: data, profile, courses },
            });
        } catch (error) {
            console.log(error);
            res.status(502).json({
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
                return res
                    .status(200)
                    .json({ message: 'check username successful' });
            }
            if (email !== undefined && email !== '') {
                const foundEmail = await Users.findOne({ email });
                if (foundEmail) {
                    return res
                        .status(409)
                        .json({ message: 'Email already exists' });
                }
                return res
                    .status(200)
                    .json({ message: 'check email successful' });
            }
        } catch (error) {
            console.log(error);
            res.status(502).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
