const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Lessons = new Schema(
    {
        course_slug: { type: String, required: true },
        lessonName: { type: String, required: true },
        lessonContent: { type: String, required: true },
    },
    { timestamps: true, collection: 'Lessons' },
);

// plugins
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Lessons', Lessons);
