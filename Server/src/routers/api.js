const express = require('express');
const passport = require('passport');
const router = express.Router();
const ApiController = require('../app/controller/ApiController');
const {
    PassportProfile,
    PassportRedirect,
} = require('../app/middleware/passportAuth');

// [GET]
// -- Google
router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    }),
);
router.get(
    '/auth/google/callback',
    PassportProfile('google'),
    PassportRedirect,
);
// -- facebook
router.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
        session: false,
        scope: ['email'],
    }),
);
router.get(
    '/auth/facebook/callback',
    PassportProfile('facebook'),
    PassportRedirect,
);
// [POST]
router.post('/code/sendCode', ApiController.sendCode);
router.post('/code/checkCode', ApiController.checkCode);
router.post('/auth/success', ApiController.ggCallback);

module.exports = router;
