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
    (req, res, next) => {
        uploadAvatarCloud.single('avatar')(req, res, (err) => {
            if (err) {
                console.error('Error during avatar upload:', err);
                return res.status(500).json({
                    error: 'Avatar upload failed!',
                    details: err.message,
                });
            }
            // Nếu không có lỗi, tiếp tục với các middleware khác
            next();
        });
    },
    checkToken,

    AuthController.updateCurrentUser,
);

module.exports = router;
