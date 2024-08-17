const express = require('express');

const router = express.Router();

const UserController = require('../app/controller/UserController');
const { checkToken } = require('../app/middleware/checkToken');

// [GET]
router.get('/me', checkToken, UserController.getUserProfile);

// [POST]

module.exports = router;
