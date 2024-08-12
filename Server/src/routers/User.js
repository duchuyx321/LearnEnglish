const express = require('express');

const router = express.Router();

const UserController = require('../app/controller/UserController');
// [GET]
router.get('/@:username', UserController.getUserProfile);

// [POST]

module.exports = router;
