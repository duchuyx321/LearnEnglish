const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { schema } = require('./Users');

const Schema = mongoose.Schema;

const Profile = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        first_name: { type: String },
        last_name: { type: String },
        avatar: { type: String },
        gender: { type: String, enum: ['male', 'female', 'other'] },
        bio: { type: String, maxlength: 500 },
        date_of_birth: { type: Date },
        facebook_url: { type: String },
        instagram_url: { type: String },
        tiktok_url: { type: String },
    },
    { timestamps: true, collection: 'Profile' },
);

// create index username email

// Plugins
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Profile', Profile);
