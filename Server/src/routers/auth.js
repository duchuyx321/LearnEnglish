const express = require('express');

const router = express.Router();

const AuthController = require('../app/controller/AuthController');
// [GET]
router.get('/');

//  [POST]
router.post('/register', AuthController.register);

module.exports = router;
