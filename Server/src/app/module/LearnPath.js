const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const LearnPath = new Schema(
    {
        namePath: { type: String, required: true, unique: true },
        descriptionPath: { type: String, required: true },
        image: { type: String },
        courses: [{ type: String, required: true }],
        slug: { type: String, slug: 'namePath' },
    },
    { timestamps: true, collection: 'LearnPath' },
);
// plugins
mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('LearnPath', LearnPath);
