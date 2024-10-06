const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

require('dotenv').config();

const Users = require('../../app/module/Users');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, cb) {
            if (profile) {
                const existingProfile = await Users.findOne({
                    $or: [
                        {
                            email: profile._json.email,
                        },
                        { provider_id: profile.provider },
                    ],
                });
                if (!existingProfile) {
                    const profileName = profile._json.name.trim();
                    // Thay thế khoảng trắng giữa các từ bằng không gian trống
                    const { nanoid } = await import('nanoid');
                    const newToken = nanoid(6).toUpperCase(); // tạo ngẫu nhiên 4 kí tự
                    const newUsername = `${profileName.replace(
                        /\s+/g,
                        '',
                    )}${newToken}`;
                    const newUser = new Users({
                        username: newUsername,
                        name: profile._json.name,
                        email: profile._json.email,
                        avatar: profile._json.picture,
                        provider: profile.provider,
                        provider_Id: profile.id,
                    });
                    await newUser.save();
                    const { password, ...other } = newUser._doc;
                    return cb(null, other);
                } else {
                    return cb(null, existingProfile);
                }
            }
        },
    ),
);
