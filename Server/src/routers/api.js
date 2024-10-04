const express = require('express');
const passport = require('passport');
const router = express.Router();
const ApiController = require('../app/controller/ApiController');
const {
    PassportProfile,
    PassportRedirect,
} = require('../app/middleware/passportAuth');

// [GET]
router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    }),
);
router.get('/auth/google/callback', PassportProfile, PassportRedirect);
// [POST]
router.post('/code/sendCode', ApiController.sendCode);
router.post('/code/checkCode', ApiController.checkCode);
router.post('/auth/login-Success', ApiController.ggCallback);

module.exports = router;
