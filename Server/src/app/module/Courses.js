const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;

const Courses = new Schema(
    {
        courseName: { type: String, required: true, unique: true },
        courseDescription: { type: String, required: true },
        image: { type: String },
        slug: { type: String, slug: 'courseName' },
    },
    { timestamps: true, collection: 'Courses' },
);

// plugins
mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Courses', Courses);
