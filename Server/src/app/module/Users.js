const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Users = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 15,
        },
        email: { type: String, required: true, unique: true, minlength: 10 },
        password: { type: String, minlength: 8 },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'student'],
            default: 'student',
        },
        provider: {
            type: String,
            required: true,
            enum: ['Local', 'Google', 'Facebook'],
            default: 'Local',
        },
    },
    { timestamps: true, collection: 'Users' },
);

// create index username email
Users.index({ username: 1, email: 1 });

// Plugins
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Users', Users);
