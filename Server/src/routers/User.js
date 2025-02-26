const express = require('express');

const router = express.Router();

const UserController = require('../app/controller/UserController');
const { checkToken } = require('../app/middleware/checkToken');

// [GET]
router.get('/profile-me', checkToken, UserController.getUserProfile);
router.get('/@:username', UserController.combinedMe);

// [POST]
router.post('/checkRegister', UserController.checkRegister);

module.exports = router;
