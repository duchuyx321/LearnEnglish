const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Token = new Schema(
    {
        token: { type: String, unique: true, required: true },
        email: { type: String, required: true },
        createAt: { type: Date, default: Date.now, expires: 240 },
    },
    { collection: 'Token' },
);
// index
Token.index({ token: 1, email: 1 });

module.exports = mongoose.model('Token', Token);
