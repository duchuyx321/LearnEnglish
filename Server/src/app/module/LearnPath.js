const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const LearnPath = new Schema(
    {
        namePath: { type: String, required: true, unique: true },
        descriptionPath: { type: String, required: true },
        courses: [
            { courseIDs: { type: Schema.Types.ObjectId, required: true } },
        ],
        slug: { type: String, slug: 'namePath' },
    },
    { timestamps: true },
);
// plugins
mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('LearnPath', LearnPath);
