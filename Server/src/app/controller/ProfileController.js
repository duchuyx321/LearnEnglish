const cloudinary = require('cloudinary');

const Profile = require('../module/Profile');

class ProfileController {
    // [GET] --/getProfile [get one profile authenticated]
    async getProfile(req, res, next) {
        try {
            const userID = req.userID;
            console.log(userID);
            const profile = await Profile.findOne({ userID });

            res.status(200).json({ data: profile });
        } catch (error) {
            res.status(502).json({ message: error.message });
        }
    }

    // [POST] ---/profile/create/:userID
    async createProfile(req, res, next) {
        try {
            const file = req.file;
            const { userID } = req.params;
            if (file) {
                req.body.avatar = file.path; // import url cloud
            }
            const newProfile = new Profile({ userID }, req.body);
            await newProfile.save();

            res.status(200).json({ data: newProfile });
        } catch (error) {
            if (req.file) {
                if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
            }
            res.status(502).json({ message: error.message });
        }
    }

    // [PATCH] --/profile/edit
    async editProfile(req, res, next) {
        try {
            const file = req.file;
            const userID = req.userID;
            console.log(req.userID);
            if (file) {
                req.body.avatar = file.path;
            }
            const updateProfile = await Profile.updateMany(
                { userID },
                req.body,
            );
            res.status(200).json({
                data: {
                    message: 'Profile updated successfully',
                    updateProfile,
                },
            });
        } catch (error) {
            console.log(error);
            if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
            res.status(502).json({ message: error.message });
        }
    }
}

module.exports = new ProfileController();
