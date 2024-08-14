const express = require('express');

const router = express.Router();

const AuthController = require('../app/controller/AuthController');
// [GET]
router.get('/');

//  [POST]
router.post('/register', AuthController.register);
router.post('/login', AuthController.Login);

module.exports = router;
