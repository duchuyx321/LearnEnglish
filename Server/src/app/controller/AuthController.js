const cloudinary = require('cloudinary');

const Users = require('../module/Users');
const Profile = require('../module/Profile');
const { hashPass, decryptPass } = require('../../util/hashPass');
const { setToken } = require('../../util/JWTUtil');
const formatDay = require('../../service/formatDay');

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

    // [PATCH] -/auth/me
    async updateCurrentUser(req, res, next) {
        try {
            const fileData = req.file;
            if (fileData) {
                req.body.avatar = fileData.path;
            }
            const userID = req.userID;
            const { date_of_birth, ...data } = req.body;
            const formatDayBirth = formatDay(date_of_birth);
            data.date_of_birth = formatDayBirth;
            if (!userID) {
                if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
                return res.status(400).json({ message: 'ID is required' });
            }
            const user = await Users.findOne({ _id: userID });
            if (!user) {
                if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
                return res.status(404).json({ message: 'user not found' });
            }
            const ProfileUpdate = await Profile.findOneAndUpdate(
                { userID },
                data,
                {
                    new: true,
                    upsert: true,
                },
            );
            if (ProfileUpdate.modifiedCount === 0) {
                return res
                    .status(404)
                    .json({ massage: 'profile update failed' });
            }
            return res.status(200).json({
                message: 'profile updated successfully',
                ProfileUpdate,
            });
        } catch (err) {
            if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports = new AuthController();
