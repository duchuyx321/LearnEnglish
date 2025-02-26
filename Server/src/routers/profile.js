const express = require('express');

const router = express.Router();
const ProfileController = require('../app/controller/ProfileController');
const { uploadAvatarCloud } = require('../app/middleware/uploadCloudinary');
const { checkToken } = require('../app/middleware/checkToken');

// [GET]
router.get('/me', checkToken, ProfileController.getProfile);

// [POST]
router.post(
    '/create/:userID',
    uploadAvatarCloud.single('avatar'),
    ProfileController.createProfile,
);
// [PUT]
router.patch(
    '/edit',
    uploadAvatarCloud.single('avatar'),
    checkToken,
    ProfileController.editProfile,
);

module.exports = router;
