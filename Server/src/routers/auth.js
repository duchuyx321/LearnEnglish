const express = require('express');

const router = express.Router();

const AuthController = require('../app/controller/AuthController');
const { checkToken } = require('../app/middleware/checkToken');
const { uploadAvatarCloud } = require('../app/middleware/uploadCloudinary');
// [GET]
router.get('/');

//  [POST]
router.post('/register', AuthController.register);
router.post('/login', AuthController.Login);

// [PATCH]
router.patch(
    '/me',
    uploadAvatarCloud.single('avatar'),
    checkToken,

    AuthController.updateCurrentUser,
);

module.exports = router;
