const passport = require('passport');
require('dotenv').config();

const PassportProfile = (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        if (err) {
            res.status(500).json({ massage: err });
        }
        console.log(profile);
        req.user = profile;

        next();
    })(req, res, next);
};

const PassportRedirect = (req, res) => {
    try {
        if (req?.user?._id) {
            res.redirect(
                `${process.env.URL_CLIENT}/login-success/${req.user?._id}`,
            );
        }
    } catch (err) {
        res.status(500).json({ massage: err });
    }
};

module.exports = { PassportProfile, PassportRedirect };
