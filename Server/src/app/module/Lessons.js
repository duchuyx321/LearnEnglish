const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Lessons = new Schema(
    {
        courseID: { type: Schema.ObjectId, required: true },
        lessonName: { type: String, required: true },
        lessonContent: { type: String, required: true },
        lessonTarget: { type: Object, required: true },
    },
    { timestamps: true },
);

// plugins
mongoose.plugin(mongooseDelete, { delete: true, deleteAt: true });

module.exports = mongoose.model('Lessons', Lessons);
